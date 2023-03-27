import CartDropdown from "../cart-dropdown/cart-dropdown.component"
import CartIcon from "../cart-icon/cart-icon.component"

import {
  HeaderContainer,
  Logo,
  NavLinkContainer,
  SignOut,
  StyledLink,
} from './header.styles'
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"
import { useDispatch } from "react-redux"
import { selectCartOpen } from "../../store/cart/cart.selector"
import { setCartOpen } from "../../store/cart/cart.action"
import { signOutStart } from "../../store/user/user.action"

const Header = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const cartOpen = useSelector(selectCartOpen)
  
  const openCart = () => dispatch(setCartOpen(true))
  const closeCart = () => dispatch(setCartOpen(false))

  const signOutHandler = async () => {
    dispatch(signOutStart())
  }
  
  return (
    <HeaderContainer>
      <Logo to='/' className="logo">
        <CrwnLogo />
      </Logo>
      <NavLinkContainer>
        <StyledLink to='/shop'>SHOP</StyledLink>
        <StyledLink to='/product'>PRODUCT</StyledLink>
        { 
          currentUser ? 
          ( <SignOut onClick={ signOutHandler }>SIGN OUT</SignOut> )
          : ( <StyledLink to='/auth'>SIGN IN</StyledLink> )
        }
        <CartIcon onClick={cartOpen? closeCart : openCart} />
      </NavLinkContainer>
      { cartOpen && <CartDropdown /> }
    </HeaderContainer>
  )
}
export default Header
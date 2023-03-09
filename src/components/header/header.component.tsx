import { Dispatch, SetStateAction, useContext } from "react"
import { UserContext } from "../../contexts/user.context"
import { User as FirebaseUser } from "firebase/auth"
import { signOutUser } from "../../util/firebase/firebase.util"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
import CartIcon from "../cart-icon/cart-icon.component"
import { CartContext } from "../../contexts/cart.context"

import {
  HeaderContainer,
  Logo,
  NavLinkContainer,
  SignOut,
  StyledLink,
} from './header.styles'
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

const Header = () => {
  const { currentUser }: { currentUser: FirebaseUser | null } = useContext(UserContext)
  const { 
    cartOpen, 
    setCartOpen 
  }: { 
    cartOpen: boolean, 
    setCartOpen: Dispatch<SetStateAction<boolean>>,
  } = useContext(CartContext)

  const openCart = () => setCartOpen(true)
  const closeCart = () => setCartOpen(false)

  const signOutHandler = async () => {
    await signOutUser()
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
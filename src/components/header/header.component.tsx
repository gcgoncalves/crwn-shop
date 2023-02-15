import { Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { UserContext } from "../../contexts/user.context"
import { User as FirebaseUser } from "firebase/auth"
import { signOutUser } from "../../util/firebase/firebase.util"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"

import './header.styles.scss'
import CartIcon from "../cart-icon/cart-icon.component"
import { CartContext } from "../../contexts/cart.context"

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
    <div className="header">
      <Link to='/' className="logo">
        <CrwnLogo />
      </Link>
      <div className="nav-links-container">
        <Link className="nav-link" to='/shop'>SHOP</Link>
        <Link className="nav-link" to='/product'>PRODUCT</Link>
        { 
          currentUser ? 
          ( <span className="nav-link" onClick={ signOutHandler }>SIGN OUT</span> )
          : ( <Link className="nav-link" to='/auth'>SIGN IN</Link> )
        }
        <CartIcon onClick={cartOpen? closeCart : openCart} />
      </div>
      { cartOpen && <CartDropdown /> }
    </div>
  )
}
export default Header
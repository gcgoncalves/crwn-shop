import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item'
import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import './cart-dropdown.styles.scss'

export default function CartDropdown() {
  const { 
    cartItems, 
    setCartOpen 
  } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckout = () => {
    setCartOpen(false)
    navigate('/checkout')
  }

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        { cartItems.length?
          cartItems.map(item => <CartItem key={ item.id } product={ item } quantity={ item.quantity } />) 
          : <span>Your cart is empty</span>
        }
      </div>
      <Button buttonType='primary' onClick={ goToCheckout }>Go to checkout</Button>
    </div>
  )
}
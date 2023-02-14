import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import './cart-dropdown.styles.scss'

export default function CartDropdown() {
  const { cartItems } = useContext(CartContext)
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        { cartItems.length?
          cartItems.map(item => <CartItem key={ item.id } product={ item } quantity={ item.quantity } />) 
          : <span>Your cart is empty</span>
        }
      </div>
      <Button buttonType='primary'>Go to checkout</Button>
    </div>
  )
}
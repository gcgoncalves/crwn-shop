import CartItem from '../cart-item/cart-item'
import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
  StyledButton,
} from './cart-dropdown.styles'

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
    <CartDropdownContainer>
      <CartItems>
        { cartItems.length?
          cartItems.map(item => <CartItem key={ item.id } product={ item } quantity={ item.quantity } />) 
          : <EmptyMessage>Your cart is empty</EmptyMessage>
        }
      </CartItems>
      <StyledButton buttonType={ BUTTON_TYPE_CLASSES.primary  } onClick={ goToCheckout }>Go to checkout</StyledButton>
    </CartDropdownContainer>
  )
}
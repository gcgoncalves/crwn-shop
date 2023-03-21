import CartItem from '../cart-item/cart-item'
import { useNavigate } from 'react-router-dom'
import { BUTTON_TYPE_CLASSES } from '../button/button.component'

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
  StyledButton,
} from './cart-dropdown.styles'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { useDispatch } from 'react-redux'
import { setCartOpen } from '../../store/cart/cart.action'

export default function CartDropdown() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()

  const goToCheckout = () => {
    dispatch(setCartOpen(false))
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
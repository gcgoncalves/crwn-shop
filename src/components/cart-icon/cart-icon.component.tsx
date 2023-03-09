import { ComponentPropsWithoutRef, useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import {
  CartIconContainer,
  StyledShoppingBagIcon,
  ItemCount,
} from './cart-icon.styles'

interface Props extends ComponentPropsWithoutRef<"div"> {}

const  CartIcon = (props: Props) => {
  const { cartItems } = useContext(CartContext)

  const { ...otherProps } = props
  return (
    <CartIconContainer { ...otherProps }>
      <StyledShoppingBagIcon className='shopping-bag-icon' />
      <ItemCount className='item-count'>{ cartItems.reduce((quantity, item) => { return quantity + item.quantity }, 0) }</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
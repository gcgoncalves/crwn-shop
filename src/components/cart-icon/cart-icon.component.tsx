import { ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../../store/cart/cart.selector'

import {
  CartIconContainer,
  StyledShoppingBagIcon,
  ItemCount,
} from './cart-icon.styles'

interface Props extends ComponentPropsWithoutRef<"div"> {}

const  CartIcon = (props: Props) => {
  const cartCount = useSelector(selectCartCount)

  const { ...otherProps } = props
  return (
    <CartIconContainer { ...otherProps }>
      <StyledShoppingBagIcon className='shopping-bag-icon' />
      <ItemCount className='item-count'>{ `${cartCount}` }</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
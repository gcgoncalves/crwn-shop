import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg'
import { ComponentPropsWithoutRef, useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import './cart-icon.styles.scss'

interface Props extends ComponentPropsWithoutRef<"div"> {}

const  CartIcon = (props: Props) => {
  const { cartItems } = useContext(CartContext)

  const { ...otherProps } = props
  return (
    <div className='cart-icon-container' { ...otherProps }>
      <ShoppingBagIcon className='shopping-bag-icon' />
      <span className='item-count'>{ cartItems.reduce((quantity, item) => { return quantity + item.quantity }, 0) }</span>
    </div>
  )
}

export default CartIcon
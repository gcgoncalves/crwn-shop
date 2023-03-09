import { useContext } from "react"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import { CartContext, CartItem } from "../../contexts/cart.context"

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles'

export default function Checkout() {
  const { 
    cartItems, 
  } = useContext(CartContext)

  const totalPrice = cartItems.reduce((total: number, cartItem: CartItem) => {
    return total + (cartItem.price * cartItem.quantity)
  }, 0)

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      { 
        cartItems.map(cartItem => (
            <CheckoutItem key={ cartItem.id } cartItem={ cartItem } />
          )
        )
      }
      <Total>Total: { totalPrice }</Total>
    </CheckoutContainer>
  )
}
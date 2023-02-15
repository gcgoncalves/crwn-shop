import { useContext } from "react"
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import { CartContext, CartItem } from "../../contexts/cart.context"

import './checkout.styles.scss'

export default function Checkout() {
  const { 
    cartItems, 
  } = useContext(CartContext)

  const totalPrice = cartItems.reduce((total: number, cartItem: CartItem) => {
    return total + (cartItem.price * cartItem.quantity)
  }, 0)

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      { 
        cartItems.map(cartItem => (
            <CheckoutItem key={ cartItem.id } cartItem={ cartItem } />
          )
        )
      }
      <div className="total">Total: { totalPrice }</div>
    </div>
  )
}
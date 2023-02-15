import { useContext } from 'react'
import { 
  CartContext, 
  CartItem 
} from '../../contexts/cart.context'

import './checkout-item.styles.scss'

interface Props {
  cartItem: CartItem 
}

const CheckoutItem = ({ cartItem }: Props) => {
  const { 
    addItemToCart, 
    removeItemFromCart, 
    removeProductFromCart, 
  } = useContext(CartContext)

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={ cartItem.imageUrl } alt={ `${cartItem.name}` } />
      </div>
      <span className='name'>
        { cartItem.name }
      </span>
      <div className='quantity'>
          <span className='arrow' onClick={ () => removeItemFromCart(cartItem) }>&#10094;</span>
          <span className='value'>{ cartItem.quantity }</span>
          <span className='arrow' onClick={ () => addItemToCart(cartItem) }>&#10095;</span>
      </div>
      <span className='price'>
        { cartItem.price }
      </span>
      <div>
        <span className='remove-button' onClick={ () => removeProductFromCart(cartItem) }>&#10005;</span>
      </div>
    </div>
  )
}

export default CheckoutItem
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addItemToCart, removeItemFromCart, removeProductFromCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'
import { CartItem } from '../../store/cart/cart.types'

import {
  CheckoutItemContainer,
  ImageContainer,
  ProductName,
  ProductPrice,
  ProductQuantity,
  ProductValue,
  Arrow,
  RemoveButton,
} from './checkout-item.styles'

interface Props {
  cartItem: CartItem
}

const CheckoutItem = ({ cartItem }: Props) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const addItem = (cartItem: CartItem) => dispatch(addItemToCart(cartItems, cartItem))
  const removeItem = (cartItem: CartItem) => dispatch(removeItemFromCart(cartItems, cartItem))
  const removeProduct = (cartItem: CartItem) => dispatch(removeProductFromCart(cartItems, cartItem)) 

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={ cartItem.imageUrl } alt={ `${cartItem.name}` } />
      </ImageContainer>
      <ProductName>
        { cartItem.name }
      </ProductName>
      <ProductQuantity>
          <Arrow onClick={ () => removeItem(cartItem) }>&#10094;</Arrow>
          <ProductValue>{ cartItem.quantity }</ProductValue>
          <Arrow onClick={ () => addItem(cartItem) }>&#10095;</Arrow>
      </ProductQuantity>
      <ProductPrice>
        { cartItem.price }
      </ProductPrice>
      <div>
        <RemoveButton onClick={ () => removeProduct(cartItem) }>&#10005;</RemoveButton>
      </div>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
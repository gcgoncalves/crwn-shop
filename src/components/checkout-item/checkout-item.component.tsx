import { useContext } from 'react'
import { 
  CartContext, 
  CartItem 
} from '../../contexts/cart.context'

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
  const { 
    addItemToCart, 
    removeItemFromCart, 
    removeProductFromCart, 
  } = useContext(CartContext)

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={ cartItem.imageUrl } alt={ `${cartItem.name}` } />
      </ImageContainer>
      <ProductName>
        { cartItem.name }
      </ProductName>
      <ProductQuantity>
          <Arrow onClick={ () => removeItemFromCart(cartItem) }>&#10094;</Arrow>
          <ProductValue>{ cartItem.quantity }</ProductValue>
          <Arrow onClick={ () => addItemToCart(cartItem) }>&#10095;</Arrow>
      </ProductQuantity>
      <ProductPrice>
        { cartItem.price }
      </ProductPrice>
      <div>
        <RemoveButton onClick={ () => removeProductFromCart(cartItem) }>&#10005;</RemoveButton>
      </div>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
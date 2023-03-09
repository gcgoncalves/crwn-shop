import Product from "../../interfaces/product.interface";

import {
  CartItemContainer,
  StyledImage,
  ItemDetails,
  ProductName,
} from './cart-item.styles'

type Props = {
  product: Product,
  quantity: number,
}

export default function CartItem({ product, quantity }: Props) {
  return (
    <CartItemContainer>
      <StyledImage src={ product.imageUrl } alt={ `${product.name}` } />
      <ItemDetails>
        <ProductName>{ product.name }</ProductName>
        <span>{ quantity } X ${ product.price }</span>
      </ItemDetails>
    </CartItemContainer>
  )
}
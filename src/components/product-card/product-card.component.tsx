import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import Product from "../../interfaces/product.interface";
import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  ProductCardContainer,
  StyledImage,
  StyledButton,
  Footer,
  ProductName,
  ProductPrice,
} from './product-card.styles'

type Props = {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const { addItemToCart } = useContext(CartContext)
  const addProductToCart = () => addItemToCart(product)

  return (
    <ProductCardContainer>
      <StyledImage src={ product.imageUrl } alt={ `${product.name}` } />
      <Footer>
        <ProductName>{ product.name }</ProductName>
        <ProductPrice>{ product.price }</ProductPrice>
      </Footer>
      <StyledButton buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={ addProductToCart }>Add to cart</StyledButton>
    </ProductCardContainer>
  )
}

export default ProductCard
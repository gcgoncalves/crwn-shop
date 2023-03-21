import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'
import Product from '../../store/category/category.types'
import { BUTTON_TYPE_CLASSES } from '../button/button.component'

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
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

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
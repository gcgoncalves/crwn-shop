import { useContext } from 'react'
import Button from '../button/button.component'
import { CartContext } from '../../contexts/cart.context'
import Product from "../../interfaces/product.interface";

import './product-card.styles.scss'

type Props = {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const { addItemToCart } = useContext(CartContext)
  const addProductToCart = () => addItemToCart(product)

  return (
    <div className='product-card-container'>
      <img src={ product.imageUrl } alt={ `${product.name}` } />
      <div className='footer'>
        <span className='name'>{ product.name }</span>
        <span className='price'>{ product.price }</span>
      </div>
      <Button buttonType='inverted' onClick={ addProductToCart }>Add to cart</Button>
    </div>
  )
}

export default ProductCard
import { Product } from '../../contexts/product.context'

import './cart-item.styles.scss'

type Props = {
  product: Product,
  quantity: number,
}

export default function CartItem({ product, quantity }: Props) {
  return (
    <div className='cart-item-container'>
      <img src={ product.imageUrl } alt={ `${product.name}` } />
      <div className='item-details'>
        <h2 className='name'>{ product.name }</h2>
        <span>{ quantity } X ${ product.price }</span>
      </div>
    </div>
  )
}
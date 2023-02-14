import { 
  createContext, 
  Dispatch, 
  ReactNode, 
  SetStateAction, 
  useState 
} from 'react'
import { Product } from './product.context'

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartOpen: boolean,
  setCartOpen: Dispatch<SetStateAction<boolean>>,
  cartItems: CartItem[],
  addItemToCart: Function,
}

const addItemToCartHandler = (product: Product, cartItems: CartItem[]): CartItem[] => {
  const cartItem: CartItem | undefined = cartItems.find((item: CartItem) => item.id === product.id)
  if (cartItem) {
    return cartItems.map(item => {
      if (item.id === cartItem.id) {
        item.quantity++
      }
      return item
    })
  } else {
    const newProduct = {
      quantity: 1,
      ...product,
    }
    return [...cartItems, newProduct]
  }
}

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},  
} as CartContextType) 

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [
    cartOpen, 
    setCartOpen
  ]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false)
  const [
    cartItems, 
    setCartItems
  ]: [
    CartItem[],
    Dispatch<SetStateAction<CartItem[]>>
  ] = useState([] as CartItem[])

  const addItemToCart = (product: Product) => {
    const newCartItems: CartItem[] = addItemToCartHandler(product, cartItems)
    setCartItems(newCartItems)
  }

  const value: CartContextType = {
    cartOpen, setCartOpen, cartItems, addItemToCart,
  }

  return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}
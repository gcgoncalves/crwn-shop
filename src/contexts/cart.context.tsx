import { 
  createContext, 
  Dispatch, 
  ReactNode, 
  SetStateAction, 
  useState 
} from 'react'
import Product from "../interfaces/product.interface";

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartOpen: boolean,
  setCartOpen: Dispatch<SetStateAction<boolean>>,
  cartItems: CartItem[],
  addItemToCart: Function,
  removeItemFromCart: Function,
  removeProductFromCart: Function,
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

const removeItemFromCartHandler = (product: Product, cartItems: CartItem[]): CartItem[] => {
  const cartItem: CartItem | undefined = cartItems.find((item: CartItem) => item.id === product.id)
  if (cartItem) {
    let newCartItems = cartItems.map(item => {
      if (item.id === cartItem.id) {
        item.quantity--
      }
      return item
    })
    return newCartItems.filter(item => {
      return item.quantity > 0
    })
  }
  return cartItems
}

const removeProductFromCartHandler = (product: Product, cartItems: CartItem[]): CartItem[] => {
  return cartItems.filter(item => {
    return item.id !== product.id
  })
}

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeProductFromCart: () => {},
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

  const removeItemFromCart = (product: Product) => {
    const newCartItems: CartItem[] = removeItemFromCartHandler(product, cartItems)
    setCartItems(newCartItems)
  }

  const removeProductFromCart = (product: Product) => {
    const newCartItems: CartItem[] = removeProductFromCartHandler(product, cartItems)
    setCartItems(newCartItems)
  }

  const value: CartContextType = {
    cartOpen, 
    setCartOpen, 
    cartItems, 
    addItemToCart, 
    removeItemFromCart,
    removeProductFromCart,
  }

  return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}
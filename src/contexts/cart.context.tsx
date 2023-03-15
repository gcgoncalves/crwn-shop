import { 
  createContext, 
  Dispatch, 
  ReactNode, 
  useReducer, 
} from 'react'
import Product from "../interfaces/product.interface";
import { Action, createAction } from '../util/recucer/reducer.util';

export interface CartItem extends Product {
  quantity: number
}

type CartStateType = {
  cartOpen: Boolean,
  cartItems: CartItem[],
  cartCount: Number,
  cartTotal: Number,
}

interface CartContextType {
  cartOpen: Boolean,
  cartItems: CartItem[],
  cartCount: Number, 
  cartTotal: Number,
  setCartOpen: Function,
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
  cartCount: 0, 
  cartTotal: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeProductFromCart: () => {},
} as CartContextType) 



export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_OPEN: 'SET_CART_OPEN',
}

const INITIAL_STATE: CartStateType = {
  cartOpen: false,
  cartItems: [] as CartItem[],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state: CartStateType, { type, payload }: Action) => {
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { 
        ...state, 
        ...payload 
      }
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return { 
        ...state, 
        cartOpen: payload,
      }
    default:
      throw new Error(`Unhandled type ${type}`)
  }
}


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [{ cartOpen, cartItems, cartCount, cartTotal }, dispatch]: 
    [CartStateType, Dispatch<Action>] = useReducer(cartReducer, INITIAL_STATE)

  const addItemToCart = (product: Product) => {
    const newCartItems: CartItem[] = addItemToCartHandler(product, cartItems)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (product: Product) => {
    const newCartItems: CartItem[] = removeItemFromCartHandler(product, cartItems)
    updateCartItemsReducer(newCartItems)
  }

  const removeProductFromCart = (product: Product) => {
    const newCartItems: CartItem[] = removeProductFromCartHandler(product, cartItems)
    updateCartItemsReducer(newCartItems)
  }

  const updateCartItemsReducer = (newCartItems: CartItem[]) => {
    const cartCount = newCartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
    const cartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartCount,
        cartTotal,
        cartItems: newCartItems,
      }
    ))
  }

  const setCartOpen = (open: Boolean) => {
    dispatch(createAction(
      CART_ACTION_TYPES.SET_CART_OPEN,
      open,
    ))
  }

  const value: CartContextType = {
    cartOpen,
    cartItems, 
    cartCount, 
    cartTotal,
    setCartOpen, 
    addItemToCart, 
    removeItemFromCart,
    removeProductFromCart,
  }

  return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}
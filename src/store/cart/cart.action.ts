import { createAction } from "../../util/recucer/reducer.util"
import Product from "../category/category.types"
import { CART_ACTION_TYPES, CartItem } from "./cart.types"

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

export const addItemToCart = (cartItems: CartItem[], product: Product) => {
  const newCartItems: CartItem[] = addItemToCartHandler(product, cartItems)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], product: Product) => {
  const newCartItems: CartItem[] = removeItemFromCartHandler(product, cartItems)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeProductFromCart = (cartItems: CartItem[], product: Product) => {
  const newCartItems: CartItem[] = removeProductFromCartHandler(product, cartItems)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const setCartItems = (cartItems: CartItem[]) => { 
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
}

export const setCartOpen = (cartOpen: boolean) => { 
  return createAction(CART_ACTION_TYPES.SET_CART_OPEN, cartOpen)
}

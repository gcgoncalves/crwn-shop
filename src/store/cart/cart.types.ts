import Product from "../category/category.types"

export interface CartItem extends Product {
  quantity: number
}

export type CartState = {
  cartOpen: Boolean,
  cartItems: CartItem[],
  cartCount: Number,
  cartTotal: Number,
}

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'cart/SET_CART_ITEMS',
  SET_CART_OPEN: 'cart/SET_CART_OPEN',
}
import { Action } from "../../util/recucer/reducer.util"
import { CartItem, CartState, CART_ACTION_TYPES } from "./cart.types"

const INITIAL_STATE: CartState = {
  cartOpen: false,
  cartItems: [] as CartItem[],
  cartCount: 0,
  cartTotal: 0,
}

export const cartReducer = (state: CartState = INITIAL_STATE, { type, payload }: Action) => {
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { 
        ...state, 
        cartItems: payload 
      }
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return { 
        ...state, 
        cartOpen: payload,
      }
    default:
      return state
  }
}
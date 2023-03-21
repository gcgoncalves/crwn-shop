import { createSelector } from "reselect"
import { CartState } from "./cart.types"


interface RootState {
  cart: CartState
}

const selectCartReducer = (state: RootState) => state.cart

export const selectCurrentCartItems = 
  createSelector(
    [selectCartReducer], 
    (cartState: CartState) => cartState.cartItems
  )

export const selectCartItems = createSelector(
  [selectCurrentCartItems],
  cartItems => cartItems
)

export const selectCartCount = createSelector(
  [selectCurrentCartItems],
  cartItems => cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
  [selectCurrentCartItems],
  cartItems => cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
)

export const selectCartOpen = createSelector(
  [selectCartReducer],
  (cartState: CartState) => cartState.cartOpen
)
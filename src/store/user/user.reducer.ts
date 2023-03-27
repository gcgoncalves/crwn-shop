import { Action } from "../../util/recucer/reducer.util"
import { UserState, USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE: UserState = {
  currentUser: null,
}

export const userReducer = (state: UserState = INITIAL_STATE, action: Action): UserState => {
  const { type, payload }: Action = action

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        error: null,
      }
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      }
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
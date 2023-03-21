import { Action } from "../../util/recucer/reducer.util"
import { UserState, USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE: UserState = {
  currentUser: null
}

export const userReducer = (state: UserState = INITIAL_STATE, action: Action): UserState => {
  const { type, payload }: Action = action

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      return state
  }
}
import { User as FirebaseUser } from "firebase/auth"
import { createAction } from "../../util/recucer/reducer.util"
import { USER_ACTION_TYPES } from "./user.types"

export const setCurrentUser = (user: FirebaseUser | null) => { 
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
}
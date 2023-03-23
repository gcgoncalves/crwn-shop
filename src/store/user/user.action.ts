import { User as FirebaseUser } from "firebase/auth"
import { createAction } from "../../util/recucer/reducer.util"
import { USER_ACTION_TYPES } from "./user.types"

export const setCurrentUser = (user: FirebaseUser | null) => { 
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
}

export const getCurrentUser = () => { 
  return createAction(USER_ACTION_TYPES.GET_CURRENT_USER, null)
}

export const googleSignInStart = () => { 
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, null)
}

export const emailSignInStart = (email: string, password: string) => { 
  return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password})
}

export const signInSuccess = (user: FirebaseUser | null) => { 
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
}

export const signInFailed = (error: Error) => { 
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
}
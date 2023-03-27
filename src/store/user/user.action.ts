import { User as FirebaseUser } from "firebase/auth"
import { createAction } from "../../util/recucer/reducer.util"
import { USER_ACTION_TYPES } from "./user.types"

export const setCurrentUser = (user: FirebaseUser | null) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)

export const getCurrentUser = () => createAction(USER_ACTION_TYPES.GET_CURRENT_USER)

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)

export const emailSignInStart = (email: string, password: string) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password})

export const signInSuccess = (user: FirebaseUser | null) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)

export const signInFailed = (error: unknown) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)

export const signUpStart = (email: string, password: string, displayName: string) => 
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email, 
    password, 
    displayName, 
  })

export const signUpSuccess = (user: FirebaseUser, additionalInformation: { displayName: string }) => 
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    user, 
    additionalInformation, 
  })

export const signUpFailed = (error: unknown) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START)

export const signOutSusccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)

export const signOutFailed = (error: unknown) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
import { User as FirebaseUser } from "firebase/auth"

export type UserState = {
  currentUser: FirebaseUser | null,
  error?: Error | null,
}

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'user/SET_CURRENT_USER',
  GET_CURRENT_USER: 'user/GET_CURRENT_USER',
  GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
  SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILED: 'user/SIGN_IN_FAILED',
}
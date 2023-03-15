import {
  createContext, 
  Dispatch, 
  ReactNode, 
  useEffect, 
  useReducer,
} from 'react'
import { NextFn  } from '@firebase/util'
import { User as FirebaseUser, User } from 'firebase/auth'
import { 
  createUserDocumentFromAuth, 
  onAuthStateChangedListener 
} from '../util/firebase/firebase.util'
import { Action, createAction } from '../util/recucer/reducer.util'

export type UserContextType = {
  currentUser: FirebaseUser | null,
  setCurrentUser: Function,
}
export type UserStateType = {
  currentUser: FirebaseUser | null,
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
})

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state: object, action: Action) => {
  const { type, payload }: Action = action

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type}`)
  }
}

export const UserProvider = ({ children }: { children: ReactNode}) => {
  const [ { currentUser } , dispatch]: 
    [UserStateType, Dispatch<Action>] = useReducer(userReducer, INITIAL_STATE)

  const setCurrentUser = (user: User | null) => { 
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  }

  const value = { 
    currentUser, 
    setCurrentUser,
  }

  useEffect(() => {
    const listener : NextFn<FirebaseUser | null> = (user: FirebaseUser | null) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    }
    const unsubscribe = onAuthStateChangedListener(listener)
    return unsubscribe
  }, [])
  
  return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>
}
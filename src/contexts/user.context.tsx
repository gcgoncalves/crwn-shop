import {
  createContext, 
  Dispatch, 
  ReactNode, 
  SetStateAction, 
  useEffect, 
  useState
} from 'react'
import { NextFn  } from '@firebase/util'
import { User as FirebaseUser } from 'firebase/auth'
import { 
  createUserDocumentFromAuth, 
  onAuthStateChangedListener 
} from '../util/firebase/firebase.util'

export type UserContextType = {
  currentUser: FirebaseUser | null,
  setCurrentUser: Dispatch<SetStateAction<FirebaseUser | null>>,
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvider = ({ children }: { children: ReactNode}) => {
  const [
    currentUser, 
    setCurrentUser
  ]: [
    FirebaseUser | null, 
    Dispatch<SetStateAction<FirebaseUser | null>>
  ] = useState<FirebaseUser | null>(null)

  const value = { currentUser, setCurrentUser }

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
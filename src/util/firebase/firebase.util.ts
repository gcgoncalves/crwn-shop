import { FirebaseApp, initializeApp } from "firebase/app"
import { 
  Auth,
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore'
import firebaseConfig from '../../firebase.config.json'

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig)

const provider: GoogleAuthProvider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth: Auth = getAuth()
export const signInWithGooglePopup = async (): Promise<UserCredential> => {
  return await signInWithPopup(auth, provider)
}

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth: FirebaseUser): Promise<DocumentReference> => {
  const userDocumentReference: DocumentReference = await doc(db, 'users', userAuth.uid)

  const userSnapshot: DocumentData = await getDoc(userDocumentReference)
  console.log(userSnapshot)
  
  if (!userSnapshot.exists()) {
    const { displayName, email }: { displayName: String | null, email: String | null } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocumentReference, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('There was an error creating the user.', error)
    }
  }
  
  return userDocumentReference
}
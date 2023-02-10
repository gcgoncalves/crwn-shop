import { FirebaseApp, initializeApp } from "firebase/app"
import { 
  Auth,
  createUserWithEmailAndPassword,
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup, 
  signInWithEmailAndPassword,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
  getFirestore,
} from 'firebase/firestore'
import firebaseConfig from '../../firebase.config.json'

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig)

const googleProvider: GoogleAuthProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account",
})
export const db = getFirestore()
export const auth: Auth = getAuth()


export const createAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInWithGooglePopup = (): Promise<UserCredential> => signInWithPopup(auth, googleProvider)
export const signInWithUserEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const createUserDocumentFromAuth = async (
                                                  userAuth: FirebaseUser, 
                                                  additionalInformation: { displayName?: string } = {}
                                                ): Promise<DocumentReference> => {
  const userDocumentReference: DocumentReference = await doc(db, 'users', userAuth.uid)
  const userSnapshot: DocumentData = await getDoc(userDocumentReference)
    
  if (!userSnapshot.exists()) {
    const { displayName, email }: { displayName: string | null, email: string | null } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocumentReference, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('There was an error creating the user.', error)
    }
  }
  
  return userDocumentReference
}
import { initializeApp } from "firebase/app"
import { 
  Auth,
  createUserWithEmailAndPassword,
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup, 
  signInWithEmailAndPassword,
  User as FirebaseUser,
  UserCredential,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
  getFirestore,
  collection,
  writeBatch,
  WriteBatch,
  CollectionReference,
  Firestore,
  query,
  getDocs,
  Query,
  QuerySnapshot,
} from 'firebase/firestore'
import Product from "../../interfaces/product.interface";
import firebaseConfig from '../../firebase.config.json'
import { CategoryCollection, CategoryMap } from "../../interfaces/category.interface"

initializeApp(firebaseConfig)

const googleProvider: GoogleAuthProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account",
})
export const db: Firestore = getFirestore()

// AUTHENTICATION

export const auth: Auth = getAuth()

export const createAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInWithGooglePopup = (): Promise<UserCredential> => signInWithPopup(auth, googleProvider)
export const signInWithUserEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<FirebaseUser | null>) => onAuthStateChanged(auth, callback)

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

// DATABASE

export const addCollectionOfCategories = async (collectionKey: string, Categories: CategoryCollection[]) => {
  const collectionReference: CollectionReference<DocumentData> = collection(db, collectionKey)
  const batch: WriteBatch = writeBatch(db)

  Categories.forEach((category: CategoryCollection) => {
    const documentReference = doc(collectionReference, category.title.toLowerCase())
    batch.set(documentReference, category)
  });

  await batch.commit()
  console.log('done')
}

export const getCategories = async () => {
  const collectionReference: CollectionReference<DocumentData> = collection(db, 'categories')
  const q: Query<DocumentData> = query(collectionReference)
  
  const snapshot: QuerySnapshot<DocumentData> = await getDocs(q)
  const categoryMap: CategoryMap = snapshot.docs.reduce((accumulator, documentSnapshot) => {
    const { 
      title, 
      items, 
    }: {
      title: string,
      items: Product[],
    } = documentSnapshot.data() as CategoryCollection
    accumulator[title.toLowerCase()] = items
    return accumulator
  }, {} as CategoryMap)

  return categoryMap
}
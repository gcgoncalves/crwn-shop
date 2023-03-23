import { initializeApp } from "firebase/app"
import { 
  Auth,
  createUserWithEmailAndPassword,
  getAuth, 
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup, 
  signOut,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth'
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  writeBatch,
  WriteBatch,
} from 'firebase/firestore'
import firebaseConfig from '../../firebase.config.json'
import { Category, CategoryCollection } from "../../store/category/category.types"

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
): Promise<DocumentData> => {
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
  
  // return userDocumentReference
  return userSnapshot
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

export const getCategories = async (): Promise<Category[]> => {
  const collectionReference: CollectionReference<DocumentData> = collection(db, 'categories')
  const q: Query<DocumentData> = query(collectionReference)
  
  const snapshot: QuerySnapshot<DocumentData> = await getDocs(q)
  return snapshot.docs.map(
    (documentSnapshot: QueryDocumentSnapshot<DocumentData>) => documentSnapshot.data()
  ) as Category[]
}


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}
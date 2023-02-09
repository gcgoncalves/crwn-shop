import { 
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../util/firebase/firebase.util"
import { UserCredential } from 'firebase/auth'
import { DocumentReference } from 'firebase/firestore'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user }: UserCredential = await signInWithGooglePopup()
    const userDocumentReference: DocumentReference = await createUserDocumentFromAuth(user)
    console.log(userDocumentReference)
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  )
}
export default SignIn
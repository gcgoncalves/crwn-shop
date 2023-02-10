import { UserCredential } from 'firebase/auth'
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../util/firebase/firebase.util"

import SignupForm from '../../components/signup-form/signup-form.component'

const SignIn = () => {
  const logGoogleUserPopup = async () => {
    const { user }: UserCredential = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUserPopup}>Sign in with Google popup</button>
      <SignupForm />
    </div>
  )
}
export default SignIn
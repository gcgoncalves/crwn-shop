import { User as FirebaseUser, UserCredential } from 'firebase/auth'
import { 
  ChangeEvent, 
  ChangeEventHandler, 
  FormEvent, 
  FormEventHandler, 
  useState, 
} from 'react'
import { useDispatch } from 'react-redux'
import { signUpStart } from '../../store/user/user.action'
import { signUp } from '../../store/user/user.saga'
import { 
  createAuthUserWithEmailAndPassword, 
  createUserDocumentFromAuth,
} from '../../util/firebase/firebase.util'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import { 
  SignupContainer,
  StyledTitle,
 } from './signup-form.styles'

type FormFields = {
  displayName: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const defaultFormFields: FormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignupForm = () => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword }: FormFields = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange: ChangeEventHandler = (event: ChangeEvent) => {
    const {name, value} = event.target as HTMLInputElement
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) return;
    
    try {
      dispatch(signUpStart(email, password, displayName))
      resetFormFields()
    }
    catch(error) {
      console.log('There was an error creating the user: ', error)
    }
  }

  return (
    <SignupContainer>
      <StyledTitle>Don't have an account?</StyledTitle>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          name="displayName" 
          label="Display name"
          value={ displayName } 
          required={ true } 
          onChange={handleChange}
        />
        <FormInput 
          name="email" 
          label="Email"
          value={ email } 
          type="email" 
          required={ true } 
          onChange={handleChange} 
        />
        <FormInput 
          name="password" 
          label="Password"
          value={ password } 
          type="password" 
          required={ true } 
          onChange={handleChange} 
        />
        <FormInput 
          name="confirmPassword" 
          label="Confirm password"
          value={ confirmPassword } 
          type="password" 
          required={ true } 
          onChange={handleChange} 
        />
        <Button>Sign Up</Button>
      </form>
    </SignupContainer>
  )
}
export default SignupForm
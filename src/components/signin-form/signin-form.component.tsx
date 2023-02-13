import { 
  ChangeEvent, 
  ChangeEventHandler, 
  FormEvent, 
  FormEventHandler, 
  useState,
} from 'react'
import {
  signInWithGooglePopup,
  signInWithUserEmailAndPassword,
} from "../../util/firebase/firebase.util"
import { FirebaseError } from 'firebase/app'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import './signin-form.styles.scss'

type FormFields = {
  email: string,
  password: string,
}

const defaultFormFields: FormFields = {
  email: '',
  password: '',
}

const SigninForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password }: FormFields = formFields

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange: ChangeEventHandler = (event: ChangeEvent) => {
    const {name, value} = event.target as HTMLInputElement
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await signInWithUserEmailAndPassword(email, password)
      resetFormFields()
    } catch(error: any) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/wrong-password') {
          console.log('Invalid password')
        }
      }
      console.log(`There was an error loggin in with user ${email}:`, error)
    }
  }

  return (
    <div className='signin-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className='buttons-container'>
          <Button type='submit'>Sign in</Button>
          <Button type='button' buttonType='secondary' onClick={signInWithGoogle}>Google Sign in</Button>
        </div>
      </form>
    </div>
  )
}
export default SigninForm
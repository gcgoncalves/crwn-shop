import SigninForm from '../../components/signin-form/signin-form.component'
import SignupForm from '../../components/signup-form/signup-form.component'
import { AuthenticationContainer } from './authentication.styles'

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SigninForm />
      <SignupForm />
    </AuthenticationContainer>
  )
}
export default Authentication
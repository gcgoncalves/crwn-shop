import SigninForm from '../../components/signin-form/signin-form.component'
import SignupForm from '../../components/signup-form/signup-form.component'
import './authentication.styles.scss'

const Authentication = () => {
  return (
    <div className='authentication-container'>
      <SigninForm />
      <SignupForm />
    </div>
  )
}
export default Authentication
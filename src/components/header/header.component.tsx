import { Link } from "react-router-dom"

import './header.styles.scss'
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { useContext } from "react"
import { UserContext } from "../../contexts/user.context"
import { User as FirebaseUser } from "firebase/auth"
import { signOutUser } from "../../util/firebase/firebase.util"

const Header = () => {
  const { currentUser }: { currentUser: FirebaseUser | null } = useContext(UserContext)

  const signOutHandler = async () => {
    await signOutUser()
  }
  
  return (
    <div className="header">
      <Link to='/' className="logo">
        <CrwnLogo />
      </Link>
      <div className="nav-links-container">
        <Link className="nav-link" to='/shop'>SHOP</Link>
        <Link className="nav-link" to='/product'>PRODUCT</Link>
        { 
          currentUser ? 
          ( <span className="nav-link" onClick={ signOutHandler }>SIGN OUT</span> )
          : ( <Link className="nav-link" to='/auth'>SIGN IN</Link> )
        }
      </div>
    </div>
  )
}
export default Header
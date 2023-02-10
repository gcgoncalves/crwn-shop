import { Link } from "react-router-dom"

import './header.styles.scss'
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

const Header = () => {
  return (
    <div className="header">
      <Link to='/' className="logo">
        <CrwnLogo />
      </Link>
      <div className="nav-links-container">
        <Link className="nav-link" to='/product'>PRODUCT</Link>
        <Link className="nav-link" to='/auth'>SIGN IN</Link>
      </div>
    </div>
  )
}
export default Header
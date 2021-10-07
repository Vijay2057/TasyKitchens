import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import KitchenContext from '../../context/KitchenContext'

import './index.css'

const Header = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <KitchenContext.Consumer>
      {value => {
        const {
          isHomeClicked,
          isCartClicked,
          isHomeClickedFun,
          isCartClickedFun,
        } = value
        const homeClick = () => isHomeClickedFun()
        const cartClick = () => isCartClickedFun()

        const homeClass = isHomeClicked ? 'selectedHeader' : 'unSelectedHeader'
        const cartClass = isCartClicked ? 'selectedHeader' : 'unSelectedHeader'

        return (
          <nav className="navBg">
            <div className="headerLogoContainer">
              <Link
                to="/"
                className="linkStyle headerLogoContainer"
                onClick={homeClick}
              >
                <img
                  src="https://i.postimg.cc/q77SwTfk/Company-Logo.png"
                  className="HeaderLogo"
                  alt="website logo"
                />
                <h1 className="HeaderlogoName">Tasty Kitchens</h1>
              </Link>
            </div>
            <ul className="headerUl">
              <li className={`eachHeaderItem ${homeClass}`} onClick={homeClick}>
                <Link to="/" className={`eachHeaderItem ${homeClass}`}>
                  <span>Home</span>
                </Link>
              </li>
              <li className={`eachHeaderItem ${cartClass}`} onClick={cartClick}>
                <Link to="/cart" className={`eachHeaderItem ${cartClass}`}>
                  <span>Cart</span>
                </Link>
              </li>
              <li className="eachHeaderItem">
                <button
                  className="logoutButton"
                  onClick={onLogout}
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        )
      }}
    </KitchenContext.Consumer>
  )
}

export default withRouter(Header)

import headerLogo from '../images/header-logo.svg'

function Header () {
  return (
  <header className="header">
    <img src={headerLogo} alt="Логотип социальной сети Место" className="header__logo"/>
  </header>
  )
}

export default Header
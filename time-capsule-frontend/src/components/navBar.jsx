import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const Navigation = ({ user, handleLogout }) => {
  const [menuActive, setMenuActive] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  const onLogout = (event) => {
    event.preventDefault()
    handleLogout()
    setMenuActive(false) 
  }

  const toggleMenu = () => {
    setMenuActive(!menuActive)
  }

  const closeMenu = () => {
    setMenuActive(false) 
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop

      if (currentScroll > lastScrollTop && currentScroll > 50) {
        setIsVisible(false)
        setMenuActive(false) 
      } else if (currentScroll < lastScrollTop || currentScroll < 200) {
        setIsVisible(true)
      }

      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollTop])

  return (
    <nav className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <h3 className="time-capsule">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            closeMenu()
          }}
        >
          Time Capsule
        </Link>
      </h3>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>

      <div
        className={`nav-links 
              ${menuActive ? 'active' : ''} 
              ${isVisible ? 'visible' : 'hidden'}`}
      >
        <Link
          className="mobile-nav-links"
          to="/create"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            closeMenu()
          }}
        >
          Create
        </Link>

        {user ? (
          <>
            <span className="mobile-nav-links">
              Logged in as {user.username}
            </span>
            <button
              className="logout"
              onClick={(event) => {
                onLogout(event)
                closeMenu()
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="mobile-nav-links"
              to="/login"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                closeMenu()
              }}
            >
              Login
            </Link>
            <Link
              className="mobile-nav-links"
              to="/register"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                closeMenu()
              }}
            >
              Register
            </Link>
          </>
        )}

        <Link
          className="mobile-nav-links"
          to="/about"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            closeMenu()
          }}
        >
          About
        </Link>
      </div>
    </nav>
  )
}

Navigation.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
}

export default Navigation

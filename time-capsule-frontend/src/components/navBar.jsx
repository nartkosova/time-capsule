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
  }

  const toggleMenu = () => {
    setMenuActive(!menuActive)
  }
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop

      if (currentScroll > lastScrollTop && currentScroll > 50) {
        setIsVisible(false)
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
        <Link to="/">Time Capsule</Link>
      </h3>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>

      <div className={`nav-links ${menuActive ? 'active' : ''}`}>
        <Link className="mobile-nav-links" to="/">
          Home
        </Link>
        <Link className="mobile-nav-links" to="/create">
          Create
        </Link>

        {user ? (
          <>
            <span style={{ padding: '10px' }}>
              Logged in as {user.username}
            </span>
            <button onClick={onLogout} style={{ padding: '10px' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="mobile-nav-links" to="/login">
              Login
            </Link>
            <Link className="mobile-nav-links" to="/register">
              Register
            </Link>
          </>
        )}

        <Link className="mobile-nav-links" to="/about">
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

import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { useState } from "react"

const Navigation = ({ user, handleLogout }) => {
  const [menuActive, setMenuActive] = useState(false);

  const onLogout = (event) => {
    event.preventDefault()
    handleLogout()
  }

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  }

  return (
    <nav>
      <h3>
        <Link to="/" style={{ padding: "10px", fontSize: "1.5rem", fontWeight: "bold" }}>
          Time Capsule
        </Link>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776; 
        </div>
      </h3>

      <div className={`nav-links ${menuActive ? "active" : ""}`}>
        <Link style={{ padding: "10px" }} to="/">Home</Link>
        <Link style={{ padding: "10px" }} to="/create">Create</Link>

        {user ? (
          <>
            <span style={{ padding: "10px" }}>Logged in as {user.username}</span>
            <button onClick={onLogout} style={{ padding: "10px" }}>Logout</button>
          </>
        ) : (
          <>
            <Link style={{ padding: "10px" }} to="/login">Login</Link>
            <Link style={{ padding: "10px" }} to="/register">Register</Link>
          </>
        )}

        <Link style={{ padding: "10px" }} to="/about">About</Link>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
};

export default Navigation;

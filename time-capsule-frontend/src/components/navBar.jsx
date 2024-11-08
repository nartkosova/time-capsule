import { Link } from "react-router-dom"
import PropTypes from "prop-types";

const padding = {
    padding: '10px'
}

const Navigation = ({ user, handleLogout }) => {

  const onLogout = (event) => {
    event.preventDefault()
    handleLogout()
  };
    return (
        <nav>
            <h3><Link style={padding} to="/">Home</Link>
            <Link style={padding} to="/create">Create</Link>
             {user ? (
                <>
                    <span style={padding}>Logged in as {user.username}</span>
                    <button onClick={onLogout} style={padding}>Logout</button>
                </>
            ) : (
                <Link style={padding} to="/login">Login</Link>
            )} 
            {user ? (
                <>
                </>
            ) : (
                <Link style={padding} to="/register">Register</Link>
            )}
            
            <Link style={padding} to="/about">About</Link></h3>
        </nav>
    )
}
Navigation.propTypes = {
    user: PropTypes.string,
    handleLogout: PropTypes.func
  };
  
export default Navigation

import { Link } from "react-router-dom"

const padding = {
    padding: '10px'
}

const Navigation = ({ user, handleLogout }) => {

  const onLogout = (event) => {
    event.preventDefault()
    handleLogout()
  };
    return (
        <div>
            <Link style={padding} to="/">Home</Link>
            <Link style={padding} to="/create">Create</Link>
            {user ? (
                <>
                    <span style={padding}>Logged in as {user.username}</span>
                    <button onClick={onLogout} style={padding}>Logout</button>
                </>
            ) : (
                <Link style={padding} to="/login">Login</Link>
            )}
            <Link style={padding} to="/about">About</Link>
        </div>
    )
}

export default Navigation

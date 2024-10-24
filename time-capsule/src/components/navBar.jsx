import { Link } from "react-router-dom"

const padding = {
    padding: '10px'
  };

const Navigation = () => {
    return (
        <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/create">Create</Link>
        <Link style={padding} to="/login">Login</Link>
        <Link style={padding} to="/about">About</Link>
      </div>
    )
}

export default Navigation
// import { useField } from "../hooks/index" 
import { useState } from "react"
import Register from "./Register"
import PropTypes from "prop-types"
// import { useNavigate } from "react-router-dom"  

const LoginForm = ({ handleLogin, handleUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerVisible, setRegisterVisible] = useState(false)
  // const navigate = useNavigate() 
  
  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password);
    setUsername("")
    setPassword("")
  }
  

  const hideRegister = { display: registerVisible ? 'none' : '' }
  const showRegister = { display: registerVisible ? '' : 'none' }

  return (
    <section>
      <form onSubmit={onSubmit}>

          <legend>Login</legend>

          <label>
          Username:
          <input
            data-testid="username"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username
          />
        </label>
        <br />

        <label>
          Password:
          <input
            data-testid="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password
          />
        </label>
        <br />
          
          <button type="submit">Login</button>

      </form>
      <div>
        <div style={hideRegister}>
          <p>Don&apos;t have an account?</p>
          <button onClick={() => setRegisterVisible(true)}>Register now</button>
        </div>

        <div style={showRegister}>
          <Register handleUser={handleUser}/>
          <button onClick={() => setRegisterVisible(false)}>I have one!</button>
        </div>
      </div>
    </section>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  handleUser: PropTypes.func
}
export default LoginForm

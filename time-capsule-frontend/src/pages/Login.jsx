import { useField } from "../hooks/index" 
import { useState } from "react"
import Register from "./Register"

const LoginForm = ({ handleLogin }) => {
  const username = useField("username")
  const password = useField("password")
  const [registerVisible, setRegisterVisible] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username.value, password.value)
    username.reset()
    password.reset()
  }

  const hideRegister = { display: registerVisible ? 'none' : '' }
  const showRegister = { display: registerVisible ? '' : 'none' }

  return (
    <section>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Login</legend>
          
          <label>
            Username:
            <input
              data-testid="username"
              placeholder="Username"
              type="text"
              {...username.input}
            />
          </label> <br/>
          
          <label>
            Password:
            <input
              data-testid="password"
              placeholder="Password"
              type="password"
              {...password.input}
            />
          </label> <br/>
          
          <button type="submit">Login</button>

        </fieldset>
      </form>
      <div>
        <div style={hideRegister}>
          <p>Don't have an account?</p>
          <button onClick={() => setRegisterVisible(true)}>Register now</button>
        </div>

        <div style={showRegister}>
          <Register />
          <button onClick={() => setRegisterVisible(false)}>I have one!</button>
        </div>
      </div>

    </section>
  )
}

export default LoginForm

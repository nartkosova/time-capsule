import { useState } from 'react'
import Register from './Register'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [registerVisible, setRegisterVisible] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  const hideRegister = { display: registerVisible ? 'none' : '' }
  const showRegister = { display: registerVisible ? '' : 'none' }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Username:
          <input
            data-testid="username"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            data-testid="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="button-container">
          <button
            type="submit"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Login
          </button>
        </div>
      </form>
      <div style={hideRegister}>
        <div className="button-container2">
          <button
            onClick={() => {
              setRegisterVisible(true)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Register now
          </button>
        </div>
      </div>

      <div style={showRegister}>
        <Register handleUser={handleUser} />
        <div className="button-container2">
          <button
            onClick={() => {
              setRegisterVisible(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            I have an account!
          </button>
        </div>
      </div>
    </div>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  handleUser: PropTypes.func,
}
export default LoginForm

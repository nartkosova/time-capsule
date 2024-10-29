import { useState } from "react"
// import { useNavigate } from "react-router-dom"

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    // navigate('/')
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Username:
          <input
           data-testid='username'
           placeholder="Username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
           data-testid='password'
           placeholder="Password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
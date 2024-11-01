import { useField } from "../hooks/index"
import PropTypes from "prop-types"

const Register = ({ handleUser }) => {
  const username = useField("username")
  const email = useField("email")
  const name = useField("name")
  const surname = useField("surname")
  const password = useField("password")

  const onSubmit = (event) => {
    event.preventDefault()
    handleUser(username.value, email.value, name.value, surname.value, password.value)
    username.reset()
    email.reset()
    name.reset()
    surname.reset()
    password.reset()
  }

  return (
    <div>
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Register</legend>
        
        <label>
          Name:
          <input
            data-testid="name"
            placeholder="Name"
            type="text"
            {...name.input}
          />
        </label> <br/>
        
        <label>
          Surname:
          <input
            data-testid="surname"
            placeholder="Surname"
            type="text"
            {...surname.input}
          />
        </label> <br/>
        
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
          Email:
          <input
            data-testid="email"
            placeholder="Email"
            type="text"
            {...email.input}
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
        </label><br/>
        
        <button type="submit">Register</button>
      </fieldset>
    </form>
  </div>
  
  )
}

Register.propTypes = {
  handleUser: PropTypes.func.isRequired
}

export default Register

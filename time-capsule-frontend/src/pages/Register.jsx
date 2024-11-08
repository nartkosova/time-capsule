import { useState } from "react"
import PropTypes from "prop-types"

const Register = ({ handleUser }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = (event) => {
    event.preventDefault()
   
    handleUser(name, surname, username, email, password)
    setUsername("")
    setEmail("")
    setName("")
    setSurname("")
    setPassword("")
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          
          <label>
            Surname:
            <input
              data-testid="surname"
              placeholder="Surname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
          <br />
          
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
          <br />
          
          <label>
            Email:
            <input
              data-testid="email"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          
          <button type="submit">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

Register.propTypes = {
  handleUser: PropTypes.func.isRequired,
};

export default Register;

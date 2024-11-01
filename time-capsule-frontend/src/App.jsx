import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CapsuleForm from './pages/capsuleForm'
import Navigation from './components/navBar'
import About from './pages/About'
import LoginForm from './pages/Login'
import { useState, useEffect } from 'react'
import loginService from './services/loginService'
import capsuleService from './services/capsuleService'
import Footer from './components/Footer'
import { CapsuleProvider } from './context/capsuleContext'
import Register from './pages/Register'
import userService from './services/userService'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [capsules, setCapsules] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  
  useEffect(() => {
    capsuleService.getCapsule().then(capsules =>
      setCapsules( capsules )
    )  
  }, [])
   useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedCapsuleappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      capsuleService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedCapsuleappUser', JSON.stringify(user)
      ) 
      capsuleService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }
  const handleLogout =  () => {
    window.localStorage.removeItem('loggedCapsuleappUser')
    capsuleService.setToken(null)
    setUser(null)
  }
  const handleUser = async (name, surname, username, email, password) => {
    name = name.trim();
    surname = surname.trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();
    try {
      const user = await userService.createUser({
        name,
        surname,
        username,
        email,
        password,
      })
      window.localStorage.setItem(
        'loggedCapsuleappUser', JSON.stringify(user)
      ) 
      capsuleService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setName('')
      setSurname('')
      setEmail('')
    } catch (exception) {
      console.log("Failed to create user: ", exception)
    }
  }

  return (
    <CapsuleProvider>
    <Router>
      <div>
        <Navigation user={user} handleLogout={handleLogout}/>
      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/create' element={<CapsuleForm />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/login' element={<LoginForm handleLogin={handleLogin} />}/>
        <Route path='/register' element={<Register handleUser={handleUser}/>}/>
      </Routes>
      <div>
        <Footer />
      </div>
    </Router>
    </CapsuleProvider>
  )
}

export default App

/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
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
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [usernmae, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [capsules, setCapsules] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    capsuleService.getCapsule().then((capsules) => setCapsules(capsules))
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
      window.localStorage.setItem('loggedCapsuleappUser', JSON.stringify(user))
      capsuleService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('Navigating to home...')
      navigate('/')
    } catch (error) {
      setNotification('Failed to login', error)
      console.log(error)
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedCapsuleappUser')
    capsuleService.setToken(null)
    setUser(null)
  }
  const handleUser = async (name, surname, username, email, password) => {
    try {
      const user = await userService.createUser({
        name,
        surname,
        username,
        email,
        password,
      })
      window.localStorage.setItem('loggedCapsuleappUser', JSON.stringify(user))
      capsuleService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setName('')
      setSurname('')
      setEmail('')
      navigate('/')
    } catch (exception) {
      setNotification('Failed to create user', exception)
      console.log(exception)
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log(
        'Failed to create user, make sure everything is correct',
        exception
      )
    }
  }

  return (
    <CapsuleProvider message={notification} isError={isError}>
      <Navigation user={user} handleLogout={handleLogout} />
      <Notification message={notification} isError={isError} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CapsuleForm />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            <LoginForm handleLogin={handleLogin} handleUser={handleUser} />
          }
        />
        <Route
          path="/register"
          element={<Register handleUser={handleUser} />}
        />
      </Routes>
      <div className="empty"></div>
      <Footer />
    </CapsuleProvider>
  )
}

export default App

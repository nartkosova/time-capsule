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
import CapsulePreview from './pages/capsulePreview'
import NotFound from './pages/NotFound'
import AdminPage from './pages/adminPage'
import UpdateCapsuleForm from './pages/updateCapsule'
import ContactForm from './pages/Contact'
import Capsules from './components/Capsules'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [capsules, setCapsules] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedCapsuleappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      capsuleService.setToken(user.token)
    } else {
      capsuleService.setToken(null)
      setUser(null)
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
      navigate('/')
    } catch (error) {
      capsuleService.setToken(null)
      setNotification(error.response.data.error)
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedCapsuleappUser')
    window.localStorage.removeItem('authToken')
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
    } catch (error) {
      const errorMessage = error.response.data.error || 'Failed to create user'
      setNotification(errorMessage)
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  return (
    <CapsuleProvider message={notification} isError={isError}>
      <Navigation user={user} handleLogout={handleLogout} />
      <div className="grow">
        <Notification message={notification} isError={isError} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
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
          <Route
            path="/capsule-preview/:id"
            element={<CapsulePreview user={user} />}
          />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/edit/:id" element={<UpdateCapsuleForm />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/capsules" element={<Capsules />} />
        </Routes>
      </div>
      <Footer />
    </CapsuleProvider>
  )
}

export default App

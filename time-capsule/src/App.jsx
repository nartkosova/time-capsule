import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CapsuleForm from './pages/capsuleForm'
import Navigation from './components/navBar'
import About from './pages/About'
import LoginForm from './pages/Login'
import { useState } from 'react'
import loginService from './services/loginService'
import capsuleService from './services/capsuleService'
import Footer from './components/Footer'

const App = () => {
  const [, setUsername] = useState('')
  const [, setPassword] = useState('')

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
  return (
    <Router>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/create' element={<CapsuleForm />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/login' element={<LoginForm handleLogin={handleLogin} />}/>
      </Routes>
      <div>
        <Footer />
      </div>
    </Router>
  )
}

export default App

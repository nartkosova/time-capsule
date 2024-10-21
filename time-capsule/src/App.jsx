import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import CapsuleForm from './pages/capsuleForm'
import Navigation from './components/navBar'
import About from './pages/About'

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/create' element={<CapsuleForm />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </Router>
  )
}

export default App

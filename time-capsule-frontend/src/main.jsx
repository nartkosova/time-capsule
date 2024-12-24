import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CapsuleProvider } from './context/capsuleContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router> 
    <CapsuleProvider> 
        <App />
    </CapsuleProvider>
      </Router>
  </StrictMode>
)

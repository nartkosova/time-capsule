import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CapsuleProvider } from './context/capsuleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <CapsuleProvider>
    <App />
    </CapsuleProvider>
  </StrictMode>,
)

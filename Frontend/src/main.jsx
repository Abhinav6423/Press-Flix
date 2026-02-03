import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/Auth.context.jsx'
import { HashRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
        <Toaster position="top-right" />

      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)

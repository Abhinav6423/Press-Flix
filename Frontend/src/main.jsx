import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/Auth.context.jsx'
import { HashRouter } from 'react-router-dom'   // ← changed
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>   {/* ← changed */}
      <AuthProvider>
        <QueryClientProvider client={queryClient}>

          <App />
        </QueryClientProvider>
        <Toaster position="top-right" />
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)

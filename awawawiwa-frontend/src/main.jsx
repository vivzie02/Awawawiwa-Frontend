import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import { LoadingProvider } from './contexts/LoadingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <LoadingScreen>
          <UserProvider>
            <App />
          </UserProvider>
        </LoadingScreen>
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
)
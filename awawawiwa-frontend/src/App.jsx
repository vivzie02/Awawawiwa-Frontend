import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import CreateQuestion from './pages/CreateQuestion';
import LoadingScreen from './components/LoadingScreen';
import { useUser } from './contexts/UserContext';

function App() {
  const [count, setCount] = useState(0)
  const { loading } = useUser(); 

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={
          <LoadingScreen isLoading={loading}>
            <Home />
          </LoadingScreen>
        } />

        <Route path="/about" element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <LoadingScreen isLoading={loading}>
                <Profile />
              </LoadingScreen>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-question"
          element={
            <PrivateRoute>
              <CreateQuestion />
            </PrivateRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App

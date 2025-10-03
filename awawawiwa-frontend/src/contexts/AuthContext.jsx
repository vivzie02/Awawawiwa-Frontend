import { createContext, useContext, useEffect, useState } from 'react';
import { useLoading } from './LoadingContext';
import { logoutUser } from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [logoutReason, setLogoutReason] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      startLoading();
      try{
        const loggedIn = await callIsTokenValid();
        setIsLoggedIn(loggedIn);
        setIsAuthReady(true);
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        stopLoading();
      }
    };

    if(localStorage.getItem("aw-jwt")){
      checkAuth();
    }
    else{
      setIsAuthReady(true);
    }
    
  }, []);

  const login = async (token) => {
    startLoading();

    try{
      localStorage.setItem('aw-jwt', token);

      if(await isTokenValid()){
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      stopLoading();
    }
  };

  const logout = async (reason = null) => {
    startLoading();

    try{
      const success = await logoutUser();
      if(!success){
        console.error('Logout failed');
      }
      localStorage.removeItem('aw-jwt');
      localStorage.removeItem('refresh-token');
      setIsLoggedIn(false);
      if (reason) setLogoutReason(reason);
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      stopLoading();
    }
  };

  const callIsTokenValid = async () => {
    startLoading();

    try{
      const valid = await isTokenValid();
      return valid;
    } catch (error) {
      console.error('Error checking token validity:', error);
    } finally {
      stopLoading();
    }
  };

  const isTokenValid = async () => {
    const token = localStorage.getItem('aw-jwt');

    if(!token){
      await logout("No token found. Please log in again.");
      return false;
    }

    try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      const valid = payload.exp > now

      if(!valid) {
        await logout("Your session has expired. Please log in again.");
      }

      return true;
    } catch (error) {
      console.error('Error validating token:', error);
      await logout("An error has occurred. Please log in again.");
      return false;
    }
    
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAuthReady, login, logout, callIsTokenValid, logoutReason, setLogoutReason }}>
      {children}

      {logoutReason && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-xl p-4 border">
          <p className="text-red-600">{logoutReason}</p>
          <button
            className="mt-2 text-sm text-blue-500"
            onClick={() => setLogoutReason(null)}
          >
            Dismiss
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { isUserLoggedIn } from "../services/AuthService";
import { useLoading } from './LoadingContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [isAuthReady, setIsAuthReady] = useState(false);

  // On page load, check for token
  useEffect(() => {
    const initAuth = async () => {
      //will log the user out if token is not valid
      console.log("Checking token validity on init...");
      const valid = await callIsTokenValid();
      setIsLoggedIn(valid);
      setIsAuthReady(true);
    }

    initAuth();
  }, []);

  const login = async (token) => {
    startLoading();

    localStorage.setItem('aw-jwt', token);

    if(await isTokenValid()){
      setIsLoggedIn(true);
    }

    stopLoading();
  };

  const logout = () => {
    startLoading();
    localStorage.removeItem('aw-jwt');
    setIsLoggedIn(false);
    stopLoading();
  };

  const callIsTokenValid = async () => {
    startLoading();
    const valid = await isTokenValid();
    stopLoading();
    return valid;
  };

  const isTokenValid = async () => {
    const token = localStorage.getItem('aw-jwt');

    if(!token){
      logout();
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      const valid = payload.exp > now

      if(!valid) {
        logout();
        return false;
      }

      const isUserValid = await isUserLoggedIn();

      if(!isUserValid){
        //no need to invalidate token or navigate, since it happens in PrivateRoute
        logout();
        return false;
      }

      return true;
    } catch (e) {
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAuthReady, login, logout, callIsTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

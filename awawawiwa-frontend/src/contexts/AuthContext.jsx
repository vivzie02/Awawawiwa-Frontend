import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { isUserLoggedIn } from "../services/AuthService";
import { useLoading } from './LoadingContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      startLoading();

      const loggedIn = await callIsTokenValid();
      setIsLoggedIn(loggedIn);
      setIsAuthReady(true);
      stopLoading();
    };

    checkAuth();
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

    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    const valid = payload.exp > now

    if(!valid) {
      logout();
      return false;
    }

    return true;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAuthReady, login, logout, callIsTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

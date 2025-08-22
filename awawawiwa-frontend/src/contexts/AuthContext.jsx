import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { isUserLoggedIn } from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // On page load, check for token
  useEffect(() => {
    const initAuth = async () => {
      //will log the user out if token is not valid
      console.log("Checking token validity on init...");
      const valid = await callIsTokenValid();
      setIsLoggedIn(valid);
    }

    initAuth();
  }, []);

  const login = async (token) => {
    setIsAuthLoading(true);

    localStorage.setItem('aw-jwt', token);

    if(await isTokenValid()){
      setIsLoggedIn(true);
    }

    setIsAuthLoading(false);
  };

  const logout = () => {
    setIsAuthLoading(true);
    localStorage.removeItem('aw-jwt');
    setIsLoggedIn(false);
    setIsAuthLoading(false);
  };

  const callIsTokenValid = async () => {
    setIsAuthLoading(true);
    const valid = await isTokenValid();
    setIsAuthLoading(false);
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
    <AuthContext.Provider value={{ isLoggedIn, login, logout, callIsTokenValid, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

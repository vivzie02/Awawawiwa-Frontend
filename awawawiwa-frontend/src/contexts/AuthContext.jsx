import React, { createContext, useContext, useEffect, useState } from 'react';
import { isUserLoggedIn } from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // On page load, check for token
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('aw-jwt');
      if (token) {
        setIsLoggedIn(true);

        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          console.error("Invalid token", e);
          setIsLoggedIn(false);
        }
      }

      setIsAuthLoading(false);
    }

    initAuth();
  }, []);

  const login = (token) => {
    localStorage.setItem('aw-jwt', token);
    setIsLoggedIn(true);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error("Failed to decode token", e);
    }
  };

  const logout = () => {
    localStorage.removeItem('aw-jwt');
    setIsLoggedIn(false);
  };

  const isTokenValid = async () => {
    const token = localStorage.getItem('aw-jwt');

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      let valid = payload.exp > now

      let isLoggedIn = await isUserLoggedIn();

      if(!valid || !isLoggedIn){
        //no need to invalidate token or navigate, since it happens in PrivateRoute
        logout();
      }

      return payload.exp > now;
    } catch (e) {
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isTokenValid, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

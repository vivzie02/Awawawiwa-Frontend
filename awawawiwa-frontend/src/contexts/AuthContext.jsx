import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On page load, check for token
  useEffect(() => {
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

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

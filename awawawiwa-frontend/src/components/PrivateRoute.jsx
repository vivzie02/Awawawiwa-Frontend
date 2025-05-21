import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MessageBox from './MessageBox';

export default function PrivateRoute({ children }) {
  const { isLoggedIn, isTokenValid, logout, isAuthLoading } = useAuth();
  const [confirmed, setConfirmed] = useState(false);

  if(isAuthLoading){
    return null;
  }

  const shouldAccess = isTokenValid() && isLoggedIn;

  if (!shouldAccess && confirmed) {
    logout();
    return <Navigate to="/" />;
  }

  if (shouldAccess) {
    return children;
  }

  return (
    <MessageBox
      type="error"
      title="Access Denied"
      message="You must be logged in to view this page."
      onConfirm={() => setConfirmed(true)}
    />
  );
}

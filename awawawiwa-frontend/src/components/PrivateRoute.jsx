import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MessageBox from './MessageBox';

export default function PrivateRoute({ children }) {
  const { logout, isAuthLoading, isLoggedIn } = useAuth();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    console.log("Check if MessageBox is accepted");
    if (confirmed) {
      logout();
    }
  }, [confirmed]);

  if(isAuthLoading){
    return null;
  }

  if (confirmed) {
    return <Navigate to="/" />;
  }

  if (isLoggedIn) {
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

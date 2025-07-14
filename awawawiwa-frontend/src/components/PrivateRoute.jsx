import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MessageBox from './MessageBox';

export default function PrivateRoute({ children }) {
  const { isTokenValid, logout, isAuthLoading } = useAuth();
  const [confirmed, setConfirmed] = useState(false);
  const [validToken, setValidToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const result = await isTokenValid();
      setValidToken(result);
    };

    if (!isAuthLoading && validToken === null) {
      checkToken();
    }
  }, [isAuthLoading, isTokenValid, validToken]);

  if(isAuthLoading || validToken == null){
    return null;
  }

  if (!validToken && confirmed) {
    logout();
    return <Navigate to="/" />;
  }

  if (validToken) {
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

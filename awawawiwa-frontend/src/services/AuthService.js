import { API_BASE_URL } from "../config/config";

export const loginUser = async (username, password, login) => {
  const res = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  login(data.token)
};

export async function logoutUser(logout, navigate, isTokenValid){
  const token = localStorage.getItem('aw-jwt');

  const res = await fetch(`${API_BASE_URL}/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if(res.ok || !isTokenValid()){
    logout();
    navigate('/');
  }
  else{
    throw new Error('Error logging out user')
  }
}
  
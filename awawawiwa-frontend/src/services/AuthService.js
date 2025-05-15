export const loginUser = async (username, password, login) => {
  const res = await fetch('http://localhost:5000/v1/users/login', {
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

export async function logoutUser(logout){
  const token = localStorage.getItem('aw-jwt');

  const res = await fetch('http://localhost:5000/v1/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if(res.ok){
    logout() 
  }
  else{
    throw new Error('Error logging out user')
  }
}
  
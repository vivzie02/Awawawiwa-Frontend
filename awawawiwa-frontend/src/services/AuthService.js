export const loginUser = async (username, password) => {
    const res = await fetch('http://localhost:50352/v1/users/login', {
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
  
    return data;
  };
  
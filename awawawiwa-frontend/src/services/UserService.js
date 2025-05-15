export async function RegisterUser(username, password, email){
    const res = await fetch('http://localhost:5000/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
    });

    if(!res.ok){
        const data = await res.json();
        throw new Error(data.message);
    }
}

export async function GetUser(){
    const token = localStorage.getItem('aw-jwt');

    const res = await fetch('http://localhost:5000/v1/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message);
    }

    return data;
    
}
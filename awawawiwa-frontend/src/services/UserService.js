import { API_BASE_URL } from "../config/config";

export async function RegisterUser(username, password, email){
    const res = await fetch(`${API_BASE_URL}/users`, {
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

    const res = await fetch(`${API_BASE_URL}/users/me`, {
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
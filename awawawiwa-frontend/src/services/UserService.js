import { API_BASE_URL } from "../config/config";

export async function registerUser(username, password, email){
    const res = await fetch(`${API_BASE_URL}/user`, {
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

    return res.ok;
}

export async function getUser(){
    const token = localStorage.getItem('aw-jwt');

    const res = await fetch(`${API_BASE_URL}/user/me`, {
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

export async function uploadProfilePicture(file){
    const token = localStorage.getItem('aw-jwt');

    if(file){
        const formData = new FormData();
        formData.append('profilePicture', file);

        const response = await fetch(`${API_BASE_URL}/user/me/profile-picture`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error(response.message);
        }

        return data;
    }
}
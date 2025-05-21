import { API_BASE_URL } from "../config/config";

export async function SubmitQuestion(category, question, image, answer){
    const token = localStorage.getItem('aw-jwt');

    const res = await fetch(`${API_BASE_URL}/questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ question, answer, category })
    });

    if(!res.ok){
        const data = await res.json();
        throw new Error(data.message);
    }

    return "Question uploaded successfully";
}
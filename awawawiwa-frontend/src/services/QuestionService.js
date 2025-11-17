import { API_BASE_URL } from "../config/config";

export async function submitQuestion(category, question, image, answer){
    const token = localStorage.getItem('aw-jwt');

    const res = await fetch(`${API_BASE_URL}/question`, {
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

export async function getUserQuestions(){
    const token = localStorage.getItem('aw-jwt');

    const res = await fetch(`${API_BASE_URL}/question/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if(!res.ok){
        const data = await res.json();
        throw new Error(data.message);
    }

    return await res.json();
}

export async function deleteQuestionById(questionId){
    const token = localStorage.getItem('aw-jwt');

    const res = await fetch(`${API_BASE_URL}/question/${questionId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if(!res.ok){
        const data = await res.json();
        throw new Error(data.message);
    }

    return "Question deleted";
}

export async function patchQuestionById(questionId, updatedData) {
    const token = localStorage.getItem('aw-jwt');

    const res = await fetch(`${API_BASE_URL}/question/${questionId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
    }
}
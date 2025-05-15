import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/AuthService";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(!username || !password){
            setError('Username and Password required');
            return;
        }

        try{
            await loginUser(username, password, login);
            navigate('/');
        } catch(error){
            setError(error.message || 'Login failed');
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded bg-white shadow">
            <h1 className="text-2xl font-semibold mb-4">Login</h1>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full p-2 border rounded" required />
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" required />
                <p className="text-red-500 text-sm"></p>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Log In
                </button>
                <button type="button" onClick={() => navigate('/register')} className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
                    Or create new user
                </button>
            </form>
        </div>
    )
}
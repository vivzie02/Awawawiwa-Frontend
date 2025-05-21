import { useState } from "react";
import { RegisterUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";

export default function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(!username || !password || !email){
            setError('All fields must be filled out');
            return;
        }

        try{
            await RegisterUser(username, password, email);
            navigate('/');
        } catch(error){
            setError(error.message);
        }
    }
    
    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded bg-white shadow">
            <h1 className="text-2xl font-semibold mb-4">Register</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full p-2 border rounded" required />
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" required />
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" required />
                {error && 
                    <MessageBox 
                        type = "error"
                        title = "Signup failed"
                        message = {error}
                        onConfirm = {() => setError(null)}
                    ></MessageBox>}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Register
                </button>
            </form>
        </div>
    )
}
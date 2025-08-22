import React from 'react';
import { useAuth } from "../contexts/AuthContext"
import { logoutUser } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Navbar(){
    const { isLoggedIn, logout, callIsTokenValid } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center mb-4 p-4 bg-gray-800 text-white">
        <div className="text-xl font-semibold">
            <a href="/">AWAWAWIWA</a>
        </div>
        <div className='flex justify-end'>
            <ul className="flex space-x-6 mr-8">
                {!isLoggedIn && <li><a href="/login" className="hover:text-blue-400">Login</a></li> }
                {isLoggedIn && <li><button onClick={() => logoutUser(logout, navigate, callIsTokenValid)} className='hover:text-blue-400 cursor-pointer'>Logout</button></li> }
                {isLoggedIn && <li><a href="/profile" className="hover:text-blue-400">Profile</a></li> }
                <li><a href="/about" className="hover:text-blue-400">About</a></li>
            </ul>
        </div>
        </nav>
    );
};
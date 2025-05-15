import { useEffect, useState } from "react";

export default function Profile() {
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[80vw] h-[80vh] flex">
            {/* Left Side */}
            <div className="flex flex-col w-1/2 space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
                <img
                    src="/picture.png"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 shadow"
                />
                <div>
                    <label className="text-sm text-gray-500">Username</label>
                    <div className="text-xl font-semibold text-gray-800">{username}</div>
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm text-gray-500">Email</label>
                <div className="text-md font-medium text-gray-700">viv@email.com</div>
            </div>

            {/* Rating */}
            <div>
                <label className="block text-sm text-gray-500">Rating</label>
                <div className="text-md font-medium text-gray-700">0</div>
            </div>

            {/* Button */}
            <button className="mt-4 w-40 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                My Questions
            </button>
            </div>

            {/* Right Side - Placeholder */}
            <div className="w-1/2 border border-dashed border-gray-300 ml-8 rounded-lg bg-gray-50">
            {/* You can place future content here */}
            </div>
        </div>
        </div>
    );
}
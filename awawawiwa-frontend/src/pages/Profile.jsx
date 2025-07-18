import { useEffect, useState } from "react";
import { GetUser, UploadProfilePicture } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { CameraIcon } from '@heroicons/react/24/outline';
import { API_BASE_URL } from "../config/config";
import { IMAGE_BASE_URL } from "../config/config";

export default function Profile() {
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [messageType, setMessageType] = useState('');
    
    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const userData = await GetUser();
            setUsername(userData.username);
            setEmail(userData.email);
            setRating(userData.rating);
            setProfilePicture(userData.profilePicture)
        } catch (err) {
            setError('Failed to load user data');
            console.error(err);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[80vw] h-[80vh] flex">
                {/* Left Side */}
                <div className="flex flex-col w-1/2 space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="profile-upload" className="relative group inline-block cursor-pointer">
                            <img
                                src={`${IMAGE_BASE_URL}${profilePicture}` || null}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 shadow"
                            />

                            {/* Camera Icon on hover */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <CameraIcon className="h-8 w-8 text-white" />
                            </div>
                        </label>
                        <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={
                                async (e) => {
                                    try{
                                        await UploadProfilePicture(e.target.files[0]);

                                        setMessageType("success");
                                        setMessageTitle("Success");
                                        setMessage("Image uploaded successfully");

                                        getUserData();
                                    } catch(err){
                                        setMessageType("error")
                                        setMessageTitle("Something went wrong");
                                        setMessage(err.message || "Upload failed");
                                    }
                                } 
                            }
                        >
                        </input>
                        <div>
                            <label className="text-sm text-gray-500">Username</label>
                            <div className="text-xl font-semibold text-gray-800">{username}</div>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-500">Email</label>
                        <div className="text-md font-medium text-gray-700">{email}</div>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm text-gray-500">Rating</label>
                        <div className="text-md font-medium text-gray-700">{rating}</div>
                    </div>

                    {/* Button */}
                    <button className="mt-4 w-40 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" onClick={() => navigate('/create-question')}>
                        Add new question
                    </button>
                </div>

                {/* Right Side - Placeholder */}
                <div className="w-1/2 border border-dashed border-gray-300 ml-8 rounded-lg bg-gray-50">
                {/* You can place future content here */}
                </div>

                {message && <MessageBox
                    type = {messageType}
                    title = {messageTitle}
                    message = {message}
                    onConfirm = {() => setMessage(null)}
                />}
            </div>
        </div>
    );
}
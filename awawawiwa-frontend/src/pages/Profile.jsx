import { useEffect, useState, useLayoutEffect } from "react";
import { UploadProfilePicture } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { CameraIcon } from '@heroicons/react/24/outline';
import { IMAGE_BASE_URL } from "../config/config";
import QuestionCard from "../components/QuestionCard";
import { GetUserQuestions, DeleteQuestionById } from "../services/QuestionService";
import { categories } from "../constants/question-categories";
import { useUser } from "../contexts/UserContext";
import { useLoading } from "../contexts/LoadingContext";

export default function Profile() {
    const { user, setUser, fetchUser } = useUser();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [messageType, setMessageType] = useState('');
    const [questions, setQuestions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('');
    const { startLoading, stopLoading } = useLoading();

    const fetchQuestions = async () => {
        startLoading();

        //refresh user data
        await fetchUser();

        //fetch user questions
        try{
            const userQuestions = await GetUserQuestions();
            setQuestions(userQuestions);

            stopLoading();
        } catch (error) {
            setMessageType("error");
            setMessageTitle("Error");
            setMessage("Failed to fetch user data");
            stopLoading();
        }
        finally{
            stopLoading();
        }
        
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const filteredQuestions = questions.filter((q) => {
        const matchesSearch = q.question.toLowerCase().includes(searchText.toLowerCase()) || q.answer.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter =
            filter === '' ||
            filter === q.category
        return matchesSearch && matchesFilter;
    });

    const handleDelete = async (questionId) => {
        try {
            await DeleteQuestionById(questionId);
            setMessageType("success");
            setMessageTitle("Deleted");
            setMessage("Question deleted successfully");

            setQuestions((prevQuestions) =>
                prevQuestions.filter((q) => q.questionId !== questionId)
            );
        } catch (err) {
            setMessageType("error");
            setMessageTitle("Error");
            setMessage(err.message || "Failed to delete question");
        }
    };

    const handleUpdate = (questionId, updatedData) => {
        //update local data
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.questionId === questionId ? { ...q, ...updatedData } : q
            )
        );
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[80vw] h-[80vh] flex">
                {/* Left Side */}
                <div className="flex flex-col w-1/2 space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="profile-upload" className="relative group inline-block cursor-pointer">
                            <img
                                src={`${IMAGE_BASE_URL}${user?.profilePicture}` || null}
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
                                        var result = await UploadProfilePicture(e.target.files[0]);

                                        setMessageType("success");
                                        setMessageTitle("Success");
                                        setMessage("Image uploaded successfully");

                                        // Update user context with new profile picture
                                        setUser((prevUser) => ({
                                            ...prevUser,
                                            profilePicture: result.userData.profilePicture
                                        }));
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
                            <div className="text-xl font-semibold text-gray-800">{user?.username}</div>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-500">Email</label>
                        <div className="text-md font-medium text-gray-700">{user?.email}</div>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm text-gray-500">Rating</label>
                        <div className="text-md font-medium text-gray-700">{user?.rating}</div>
                    </div>

                    {/* Button */}
                    <button className="mt-4 w-40 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" onClick={() => navigate('/create-question')}>
                        Add new question
                    </button>
                </div>

                {/* Right Side - Questions */}
                <div className="w-1/2 border border-dashed border-gray-300 ml-8 rounded-lg bg-gray-50 overflow-y-auto max-h-[calc(80vh-4rem)]">
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-lg font-semibold text-gray-700">My Questions</h2>
                        <div className="flex gap-4">
                            {/* Search */}
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-48"
                            />
                            {/* Filter */}
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                    {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {filteredQuestions.length === 0 ? (
                    <p className="text-sm text-gray-500 px-4">No questions found.</p>
                    ) : (
                        filteredQuestions.map((q) => (
                            <div key={q.questionId} className="mb-4 px-4">
                                <QuestionCard
                                    question={q.question}
                                    answer={q.answer}
                                    approved={q.approved}
                                    questionId={q.questionId}
                                    category={q.category}
                                    onDelete={handleDelete}
                                    onUpdate={handleUpdate}
                                />
                            </div>
                        ))
                    )}
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
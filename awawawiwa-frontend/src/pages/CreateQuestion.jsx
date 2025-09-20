import { useState } from "react";
import { categories } from "../constants/question-categories";
import { SubmitQuestion } from "../services/QuestionService";
import MessageBox from "../components/MessageBox";
import { useLoading } from "../contexts/LoadingContext";

export default function CreateQuestion() {
    const [category, setCategory] = useState("");
    const [question, setQuestion] = useState("");
    const [image, setImage] = useState(null);
    const [answer, setAnswer] = useState("");
    const [message, setMessage] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [messageType, setMessageType] = useState('')
    const { isLoading, startLoading, stopLoading } = useLoading();

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        startLoading();
        try {
            let response = await SubmitQuestion(category, question, image, answer);

            // Reset form
            setCategory("");
            setQuestion("");
            setImage(null);
            setAnswer("");

            setMessageType("success");
            setMessageTitle("Success");
            setMessage(response);
        } catch (err) {
            setMessageType("error")
            setMessageTitle("Something went wrong");
            setMessage(err.message || "Create Question failed");
        } finally {
            stopLoading();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
                <h2 className="text-2xl font-semibold">Create a New Question</h2>

                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Question</label>
                    <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={4}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Optional Image</label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-600"
                    />
                    {image && (
                    <div className="mt-2">
                        <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="max-h-40 rounded border"
                        />
                    </div>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Answer</label>
                    <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={4}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
            </form>

            {message && <MessageBox
                type = {messageType}
                title = {messageTitle}
                message = {message}
                onConfirm = {() => setMessage(null)}
            />}
        </div>
    );
}

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { useUser } from "../contexts/UserContext";
import ImageCard from "../components/ImageCard";
import { useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

export default function Home() {
  const { isLoggedIn, isAuthReady } = useAuth();
  const { user, fetchUser } = useUser();
  const navigate = useNavigate();
  const { isLoading } = useLoading();

  useEffect(() => {
    const loadData = async () => {
      if(!isAuthReady) return;

      // Refresh user data
      if (isLoggedIn) {
        await fetchUser();
      }
    };
    loadData();
  }, [isAuthReady, isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          AWAWAWIWA PubQuiz
        </motion.h1>

        {isLoggedIn && !isLoading && <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mb-8"
        >
          Hi {user?.username}!
        </motion.p>
        }

        {!isLoggedIn ? (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 cursor-pointer shadow"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-xl bg-indigo-700 font-semibold hover:bg-indigo-800 cursor-pointer shadow"
            >
              Sign Up 
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/create-question")}
            className="px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 cursor-pointer shadow"
          >
            Add a new Question
          </button>
        )}
      </section>

      <section className="py-12 text-center">
        {!isLoggedIn ? (
          <div>Space for new user</div>
        ) : (
          <div className="flex justify-center gap-6">
            <ImageCard
              src={"images/cards/onlineQuiz.jpg"}
              alt="Play Online"
              onClick={() => navigate("/quiz")}
              className="w-48 h-48"
            />
            <ImageCard
              src={"images/cards/quizPdf.jpg"}
              alt="Generate Quiz PDF"
              onClick={() => navigate("/quiz-pdf")}
              className="w-48 h-48"
            />
            <ImageCard
              src={"images/cards/browseQuestions.jpg"}
              alt="Browse Questions"
              onClick={() => navigate("/browse-questions")}
              className="w-48 h-48"
            />
          </div>
        )}
      </section>
    </div>
  );
}

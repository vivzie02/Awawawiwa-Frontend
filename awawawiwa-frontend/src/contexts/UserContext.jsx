import { createContext, useContext, useEffect, useState } from "react";
import { GetUser } from "../services/UserService";
import { useAuth } from "./AuthContext";
import { useLoading } from "./LoadingContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { isLoggedIn } = useAuth();
    const { isLoading, startLoading, stopLoading } = useLoading();

    const fetchUser = async () => {
        startLoading();

        if(!isLoggedIn) {
            stopLoading();
            return; 
        }

        try {
            const data = await GetUser();
            setUser(data);
        } catch (err) {
            console.error("Failed to fetch user:", err);
            setError(err.message || "Failed to fetch user data");
        } finally {
            stopLoading();
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, error, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

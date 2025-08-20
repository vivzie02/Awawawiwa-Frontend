import { createContext, useContext, useEffect, useState } from "react";
import { GetUser } from "../services/UserService";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isTokenValid, logout, isAuthLoading } = useAuth();

    const fetchUser = async () => {
        try {
            const data = await GetUser();
            setUser(data);
            setIsLoggedIn(true);
        } catch (err) {
            console.error("Failed to fetch user:", err);
            setError(err.message || "Failed to fetch user data");
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            if(!isAuthLoading && await isTokenValid()) {
                fetchUser();
            }
        };

        checkAuth();
    }, [isAuthLoading]);

    return (
        <UserContext.Provider value={{ user, setUser, loading, error, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

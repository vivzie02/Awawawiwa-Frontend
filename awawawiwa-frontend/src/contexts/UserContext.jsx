import { createContext, useContext, useEffect, useState } from "react";
import { GetUser } from "../services/UserService";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { callIsTokenValid, isLoggedIn, isAuthLoading } = useAuth();

    const fetchUser = async () => {
        if(isAuthLoading) {
            return;
        }

        if(!isLoggedIn) {
            setLoading(false);
            return; 
        }

        try {
            const data = await GetUser();
            setUser(data);
        } catch (err) {
            console.error("Failed to fetch user:", err);
            setError(err.message || "Failed to fetch user data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            if(!isAuthLoading) {
                await fetchUser();
            }
            else {
                setUser(null);
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

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/client";

interface AuthContextType {
    currentUser: UserData | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData: UserData = {
                    id: user.uid,
                    email: user.email || "",
                    name: user.displayName || "",
                    profilePicture: user.photoURL || "",
                };

                setCurrentUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                setCurrentUser(null);
                localStorage.removeItem("user");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

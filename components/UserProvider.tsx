"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";

interface UserContextType {
    user: any;
    setUser: (user: any) => void;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getCurrentUser();
            setUser(userData);
        };
        fetchUser();
    }, []);

    const logout = async () => {
        await signOut();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

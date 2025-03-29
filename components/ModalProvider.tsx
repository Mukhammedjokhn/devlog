"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
    isSignInOpen: boolean;
    setIsSignInOpen: (isOpen: boolean) => void;
    isSignUpOpen: boolean;
    setIsSignUpOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    return (
        <ModalContext.Provider
            value={{
                isSignInOpen,
                setIsSignInOpen,
                isSignUpOpen,
                setIsSignUpOpen,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

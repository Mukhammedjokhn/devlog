"use client";

import { useModal } from "@/components/ModalProvider";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    signInWithPopup,
    GoogleAuthProvider,
    OAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signInWithProvider } from "@/lib/actions/auth.action";
import { useUser } from "./UserProvider";

const AuthModals = () => {
    const { isSignInOpen, setIsSignInOpen, isSignUpOpen, setIsSignUpOpen } =
        useModal();
    const { setUser, user } = useUser();

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            const response = await signInWithProvider(idToken);
            if (response.success) {
                setIsSignInOpen(false);
                setUser(user);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    // 🔹 Apple orqali tizimga kirish
    const handleAppleSignIn = async () => {
        try {
            const provider = new OAuthProvider("apple.com");
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            const response = await signInWithProvider(idToken);
            if (response.success) {
                setIsSignInOpen(false);
                setIsSignUpOpen(false);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Apple sign-in error:", error);
        }
    };

    return (
        <>
            {/* SIGN IN MODAL */}
            <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-[var(--background)] text-black dark:text-[var(--foreground)] border-[var(--border-color)]">
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            Welcome Back!
                        </DialogTitle>
                    </DialogHeader>
                    <div className="my-5 flex flex-col gap-4">
                        <Button
                            variant="outline"
                            className="rounded-full py-5 cursor-pointer"
                            onClick={handleGoogleSignIn}
                        >
                            Sign in with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full py-5 cursor-pointer"
                            onClick={handleAppleSignIn}
                        >
                            Sign in with Apple
                        </Button>
                    </div>
                    <div className="flex items-center justify-center">
                        <p className="text-sm">No account?</p>
                        <Button
                            onClick={() => {
                                setIsSignInOpen(false);
                                setIsSignUpOpen(true);
                            }}
                            className="px-1 text-[var(--success)] cursor-pointer text-sm bg-transparent shadow-none"
                        >
                            Create one
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* SIGN UP MODAL */}
            <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-[var(--background)] text-black dark:text-[var(--foreground)] border-[var(--border-color)]">
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            Join DevLog
                        </DialogTitle>
                    </DialogHeader>
                    <div className="my-5 flex flex-col gap-4">
                        <Button
                            variant="outline"
                            className="rounded-full py-5 cursor-pointer"
                            onClick={handleGoogleSignIn}
                        >
                            Sign up with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full py-5 cursor-pointer"
                            onClick={handleAppleSignIn}
                        >
                            Sign up with Apple
                        </Button>
                    </div>
                    <div className="flex items-center justify-center">
                        <p className="text-sm">Already have an account?</p>
                        <Button
                            onClick={() => {
                                setIsSignUpOpen(false);
                                setIsSignInOpen(true);
                            }}
                            className="px-1 text-[var(--success)] cursor-pointer text-sm shadow-none"
                        >
                            Sign in
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AuthModals;

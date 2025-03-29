"use client";

import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useModal } from "./ModalProvider";
import { isAuthenticated } from "@/lib/actions/auth.action";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
    const { theme } = useTheme();
    const { setIsSignInOpen, setIsSignUpOpen } = useModal();

    const [isUserAuthenticated, setIsUserAuthenticated] = useState<
        boolean | null
    >(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated();
            setIsUserAuthenticated(authStatus);
        };

        checkAuth();
    }, []);

    if (isUserAuthenticated === null) return null;

    return (
        <div className="max-w-[1200px] mx-auto h-14 flex items-center justify-between pr-6 pl-3">
            <Link href={"/"}>
                <Image
                    src={
                        theme === "dark"
                            ? "/devlog-logo-white.png"
                            : "/devlog-logo.png"
                    }
                    alt="DevLog Logo"
                    width={100}
                    height={50}
                    priority
                    className="transition-opacity duration-300 ease-in-out"
                />
            </Link>
            <div className="flex gap-4">
                <ThemeToggle />

                {!isUserAuthenticated ? (
                    <>
                        <Button
                            className="cursor-pointer"
                            onClick={() => setIsSignInOpen(true)}
                        >
                            Sign In
                        </Button>

                        <Button
                            className="cursor-pointer bg-[var(--button-bg)] dark:bg-[var(--button-bg)] text-[var(--background)]"
                            onClick={() => setIsSignUpOpen(true)}
                        >
                            Get Started
                        </Button>
                    </>
                ) : (
                    <Link href="/profile">
                        <Button className="cursor-pointer">Profile</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;

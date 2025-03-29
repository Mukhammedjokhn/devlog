"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useModal } from "./ModalProvider";
import Link from "next/link";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { useUser } from "./UserProvider";

const Navbar = () => {
    const { setIsSignInOpen, setIsSignUpOpen } = useModal();
    const { theme, resolvedTheme } = useTheme();
    const { user } = useUser();
    const currentTheme = theme === "system" ? resolvedTheme : theme;

    const logoSrc =
        currentTheme === "dark" ? "/devlog-logo-white.png" : "/devlog-logo.png";

    return (
        <div className="max-w-[1200px] mx-auto h-14 flex items-center justify-between pr-6 pl-3">
            <Link href={"/"}>
                <Image
                    src={logoSrc}
                    alt="DevLog Logo"
                    width={100}
                    height={50}
                    priority
                    className="transition-opacity duration-300 ease-in-out"
                />
            </Link>
            <div className="flex gap-4">
                <ThemeToggle />
                {user ? (
                    <Button
                        className="flex items-center gap-1 cursor-pointer shadow-none"
                        onClick={() => redirect("/profile")}
                    >
                        <Image
                            src={user.profilePicture}
                            alt="profile"
                            width={30}
                            height={30}
                            className="rounded-full object-cover"
                        />
                        <p>{user.name}</p>
                    </Button>
                ) : (
                    <>
                        <Button
                            className="cursor-pointer text-[var(--foreground)] shadow-none"
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
                )}
            </div>
        </div>
    );
};

export default Navbar;

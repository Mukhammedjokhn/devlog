"use client";

import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="max-w-[1200px] mx-auto h-14 flex items-center justify-between pr-6 pl-3">
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
            />
            <ThemeToggle />
        </div>
    );
};

export default Navbar;

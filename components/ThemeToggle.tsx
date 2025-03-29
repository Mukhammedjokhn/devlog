"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <DropdownMenu modal>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer relative border-[var(--border-color)] dark:border-[var(--border-color)] 
                    focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                    {theme === "light" ? (
                        <Sun className="h-5 w-5 transition-transform duration-300" />
                    ) : (
                        <Moon className="h-5 w-5 transition-transform duration-300" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="border-[var(--border-color)] bg-white dark:bg-[var(--background)]"
            >
                <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-[var(--border-color)]"
                    onClick={() => setTheme("light")}
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-[var(--border-color)]"
                    onClick={() => setTheme("dark")}
                >
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-[var(--border-color)]"
                    onClick={() => setTheme("system")}
                >
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ThemeToggle;

"use client";
import { ComponentProps } from "react";
import dynamic from "next/dynamic";

const NextThemesProvider = dynamic(
    () => import("next-themes").then((mod) => mod.ThemeProvider),
    {
        ssr: false,
    }
);

export function ThemeProvider({
    children,
    ...props
}: ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}

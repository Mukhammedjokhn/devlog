import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvide";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "DevLog",
    description:
        "DevLog is a hub for developers, tech enthusiasts, and anyone passionate about coding. Whether you're diving into web development, exploring the latest frameworks, or mastering programming concepts, DevLog provides insightful articles, tutorials, and expert opinions to fuel your growth.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`bg-[var(--background)] text-[var(--foreground)] dark:text-[var(--foreground)] dark:bg-[var(--background)] ${poppins.variable} antialiased transition-colors duration-100`}
            >
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}

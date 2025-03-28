"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-6xl ">404</h1>
            <p className="text-2xl text-gray-400 mt-2">Oops! Page not found.</p>
            <Button
                onClick={() => redirect("/")}
                variant={"outline"}
                className="cursor-pointer mt-4 px-8 py-5"
            >
                Back to home
            </Button>
        </div>
    );
}

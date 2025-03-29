"use client";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-10 h-10 border-4 border-t-transparent border-[var(--foreground)] rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;

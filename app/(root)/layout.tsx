import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav className="fixed top-0 left-0 w-full z-50 border-b border-[var(--border-color)] border-dashed">
                <Navbar />
            </nav>

            <main className="pt-16 p-6 container mx-auto max-w-[1200px] h-screen border-l border-r border-[var(--border-color)] border-dashed">
                {children}
            </main>
        </div>
    );
}

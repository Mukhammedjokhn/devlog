"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/UserProvider";

const Profile = () => {
    const router = useRouter();
    const { logout } = useUser();

    const handleSignOut = async () => {
        try {
            logout();
            router.push("/");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            <Button
                onClick={handleSignOut}
                className="bg-red-500 text-white p-2 rounded cursor-pointer"
            >
                Sign out
            </Button>
        </div>
    );
};

export default Profile;

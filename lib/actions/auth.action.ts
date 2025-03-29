"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const SESSION_DURATION = 60 * 60 * 24 * 7;

async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: SESSION_DURATION * 1000,
    });

    cookieStore.set("session", sessionCookie, {
        maxAge: SESSION_DURATION,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });
}

export async function signInWithProvider(idToken: string) {
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        const userRecord = await db.collection("users").doc(uid).get();
        if (!userRecord.exists) {
            await db
                .collection("users")
                .doc(uid)
                .set({
                    email,
                    name: name || "",
                    profilePicture: picture || "",
                });
        }

        await setSessionCookie(idToken);

        return { success: true, message: "Signed in successfully" };
    } catch (error) {
        console.error("Sign-in error:", error);
        return { success: false, message: "Authentication failed" };
    }
}

export async function adminSignIn(email: string, password: string) {
    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord.customClaims?.admin) {
            return { success: false, message: "Access denied. Admin only." };
        }

        const idToken = await auth.createCustomToken(userRecord.uid);
        await setSessionCookie(idToken);

        return { success: true, message: "Admin signed in successfully" };
    } catch (error) {
        console.error("Admin login error:", error);
        return { success: false, message: "Invalid email or password" };
    }
}

export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(
            sessionCookie,
            true
        );
        const userRecord = await db
            .collection("users")
            .doc(decodedClaims.uid)
            .get();
        if (!userRecord.exists) return null;

        return { ...userRecord.data(), id: userRecord.id };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}

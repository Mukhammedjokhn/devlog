import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/profile", "/admin"];
const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookieStore = cookies();
    const sessionCookie = await cookieStore.get("session")?.value;

    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if (isPublicRoute && sessionCookie) {
        return NextResponse.redirect(new URL("/profile", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

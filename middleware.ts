import { NextRequest, NextResponse } from "next/server";
import {refreshAccessToken} from "@/lib/auth/session";

const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
        return Date.now() >= payload.exp * 1000;
    } catch {
        return true;
    }
};

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        /\.(.*)$/.test(pathname)
    ) {
        return NextResponse.next();
    }

    const publicPaths = ["/sign-in","/"];
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;


    if (accessToken && isTokenExpired(accessToken)) {
        console.log("Access token expired, refreshing...");

        if (!refreshToken) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }

        const newAccessToken = await refreshAccessToken(refreshToken);

        if (!newAccessToken) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }

        const response = NextResponse.next();
        response.cookies.set("access_token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
        });

        return response;
    }

    return NextResponse.next();
}

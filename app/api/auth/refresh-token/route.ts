import { NextResponse } from "next/server";
import { deleteCookie, setCookie } from "@/lib/utils/cookies";
import {cookies} from "next/headers";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get("refresh_token")?.value;

    if (!refresh_token) {
        console.error("Refresh token is missing or invalid.");
        await deleteCookie("access_token");
        await deleteCookie("user_data");
        return NextResponse.redirect("/sign-in");
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to refresh token");
        }

        const { access_token } = await response.json();
        console.log("New access token received:", access_token);

        const res = NextResponse.json({ access_token });
        // @ts-ignore
        res.cookies.set("access_token", access_token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
            sameSite: "Strict",
        });

        return res;
    } catch (error: any) {
        console.error("Error refreshing access token:", error.message);
        return NextResponse.redirect("/sign-in");
    }
}

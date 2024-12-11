import {cookies} from "next/headers";
import {deleteCookie, setCookie} from "@/lib/utils/cookies";

const isTokenExpired = (token: string): boolean => {
    const { exp } = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()) as { exp: number };
    return Date.now() >= exp * 1000;
};

export const getSession = async () => {
    const cookieStore = await cookies();
    let access_token = cookieStore.get('access_token')?.value;
    const userData = cookieStore.get('user_data')?.value;

    if (!access_token || isTokenExpired(access_token)) {
        console.log("Access token missing or expired, attempting to refresh...");
        access_token = await refreshAccessToken();
    }

    if (!access_token) {
        console.error("Session is invalid. Redirecting to sign-in.");
        return null;
    }

    return { access_token, userData };
};

export const refreshAccessToken = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/refresh-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Failed to refresh token:", error.detail || response.statusText);
            return null;
        }

        const { access_token } = await response.json();

        await setCookie("access_token", access_token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
            sameSite: "Strict",
        });

        console.log("Access token refreshed successfully:", access_token);
        return access_token;
    } catch (error: any) {
        console.error("Error refreshing token:", error.message);
        return null;
    }
};

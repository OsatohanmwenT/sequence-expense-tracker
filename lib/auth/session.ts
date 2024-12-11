"use server"

import {cookies} from "next/headers";

const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
        return Date.now() >= payload.exp * 1000;
    } catch {
        return true;
    }
}

export const getSession = async () => {
    const cookieStore = await cookies();
    let access_token = cookieStore.get('access_token')?.value;
    const refresh_token = cookieStore.get('refresh_token')?.value;
    const userData = cookieStore.get('user_data')?.value;

    if (!access_token || isTokenExpired(access_token)) {

        if (!refresh_token) {
            return null
        }
        access_token = await refreshAccessToken(refresh_token);
        if (!access_token) {
            console.error("Failed to refresh access token. Redirecting to sign-in.");
        }
    }

    return { access_token, userData };
};


export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/refresh-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            console.error("Failed to refresh token");
            return null;
        }

        const { access_token } = await response.json();
        return access_token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};
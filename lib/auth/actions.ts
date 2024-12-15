"use server"
import {redirect} from "next/navigation";
import {deleteCookie, setCookie} from "@/lib/utils/cookies";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const COOKIE_OPTIONS = {
    httpOnly: true,
    path: "/",
    sameSite: "Strict",
};

export const loginUser = async (formData: { password: string; email: string }) => {
    try {
        const response = await fetch(`${apiUrl}/auth/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Registration failed');
        }

        const { access_token, refresh_token, username } = await response.json();

        await setCookie('access_token', access_token, {
            ...COOKIE_OPTIONS,
            sameSite: 'Strict',
        });

        await setCookie("refresh_token", refresh_token, {
            ...COOKIE_OPTIONS,
            sameSite: "Strict",
        });

        await setCookie('user_data', username, {
            ...COOKIE_OPTIONS,
            httpOnly: false,
            sameSite: 'Strict',
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const registerUser = async (formData: { email: string; username?: string; password: string }) => {
    try {
        const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Registration failed');
        }

        const { message } = await response.json();
        return { success: true, message: message, redirect: "/sign-in" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const logoutUser = async () => {
    await deleteCookie("access_token");
    await deleteCookie("refresh_token");
    await deleteCookie("user_data");
    redirect("/sign-in");
};
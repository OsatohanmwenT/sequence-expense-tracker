"use server"
import { cookies } from 'next/headers';
import {redirect} from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

        const { access_token, username } = await response.json();

        const cookieStore = await cookies();

        // @ts-ignore
        cookieStore.set('access_token', access_token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 14,
            path: '/',
            sameSite: 'Strict',
        });

        // @ts-ignore
        cookieStore.set('user_data', username, {
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 14,
            path: '/',
            sameSite: 'Strict',
        });
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
        return { success: true, message: message };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

// Make logoutUser async to delete the cookies
export const logoutUser = async () => {
    const cookieStore = await cookies();

    // Remove cookies by setting them with an expired date
    cookieStore.delete("access_token");
    cookieStore.delete("user_data");
    redirect("/sign-in");
};

// Make getSession async as it returns a promise for cookie retrieval
export const getSession = async () => {
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access_token');
    const userData = cookieStore.get('user_data');

    if (!access_token || !userData) return null;

    return { access_token, userData};
};

"use server"
import { cookies } from 'next/headers';
import {redirect} from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (formData: { password: string; email: string }) => {
    try {
        // Send login request to the backend
        const response = await fetch(`${apiUrl}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const { access_token, username } = await response.json();
        // Wait for the cookies store
        const cookieStore = await cookies();

        // Set the access token cookie
        cookieStore.set('access_token', access_token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: 'Strict',
        });

        cookieStore.set('user_data', username, {
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: 'Strict',
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const registerUser = async (formData: { email: string; username?: string; password: string }) => {
    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        const { message } = await response.json();
        return message;
    } catch (error) {
        console.error(error);
        throw error;
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

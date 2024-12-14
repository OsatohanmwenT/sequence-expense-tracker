"use client"

import React, {useEffect} from 'react'
import {notFound, redirect, useRouter, useSearchParams} from "next/navigation";
import {setCookie} from "@/lib/utils/cookies";
import {Loader} from "lucide-react";

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    console.log(code);

    useEffect(() => {
        const handleAuth = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/callback/google`,{
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${code}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch authentication data");
                }

                const authData = await response.json();

                // Store the tokens and user details securely
                await setCookie('access_token', authData.access_token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 30,
                    path: "/",
                    sameSite: "Strict",
                });
                await setCookie('refresh_token', authData.refresh_token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 30,
                    path: "/",
                    sameSite: "Strict",
                });
                await setCookie('user_data', authData.username, {
                    httpOnly: false,
                    maxAge: 60 * 60 * 24 * 30,
                    path: "/",
                    sameSite: "Strict",
                });
                await setCookie('user_id', authData.user_id, {
                    httpOnly: false,
                    maxAge: 60 * 60 * 24 * 30,
                    path: "/",
                    sameSite: "Strict",
                });

                // Redirect to the dashboard or home page
                router.push('/');
            } catch (error) {
                console.error('Error handling authentication:', error);
                redirect(notFound())
            }
        };

        handleAuth();
    }, [router]);

    return <div className="text-center">
        <Loader className="size-10 animate-spin" />
    </div>;
}
export default Page

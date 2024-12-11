"use server"

import { cookies } from 'next/headers';

export const setCookie = async (name: string, value: string, options: Record<string, any>) => {
    const cookieStore = await cookies();
    cookieStore.set(name, value, options);
};

export const deleteCookie = async (name: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
};
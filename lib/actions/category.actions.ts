"use server"

import {Category} from "@/lib/entities";
import {getSession} from "@/lib/auth/session";
import {revalidatePath} from "next/cache";

const url = process.env.NEXT_PUBLIC_API_URL

export const fetchCategory = async ()=> {
    const access_token = await getSession()
    try {
        const response = await fetch(`${url}/categories/`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token?.access_token}`
            },
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error.statusText, error.status);
            throw new Error(error.detail || 'Fetch failed');
        }
        const responseData = await response.json();
        return responseData as Category[];
    }
    catch (error: any) {
        console.log(error.statusText, error.status);
        console.error("ERROR:",error.message);
    }
}

export const create = async (category: Category, path: string) => {
    const access_token = await getSession();
    try {
        const response = await fetch(`${url}/categories/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token?.access_token}`,
            },
            body: JSON.stringify(category),  // Send category data
        });
        revalidatePath(path);  // Revalidate path after creating category
        return await response.json() as Category;  // Handle the response accordingly
    } catch (error) {
        console.error(error);
    }
};

export const updateExpense = async ({expenseId, payload}: {expenseId: number, payload: Category}): Promise<void> => {
    const access_token = await getSession()

    try {
        const response = await fetch(`${url}/categories/${expenseId}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${{ access_token }}`
            },
            body: JSON.stringify(payload),
        })
    } catch (error) {
        console.error(error);
    }
}

export const deleteCategory = async (category_name: string) => {
    const session = await getSession();
    try {
        const response = await fetch(`${url}/categories/name/${category_name}`,{
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token}`,
            }
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to deactivate budget.");
        }

        const details = await response.json();
        return (details);
    } catch (error: any) {
        console.log("didnt work")
        console.error(error);
    }
}
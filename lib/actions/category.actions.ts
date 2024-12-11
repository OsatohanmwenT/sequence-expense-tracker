"use server"

import {Category} from "@/lib/entities";
import {getSession} from "@/lib/auth/session";

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

        return await response.json() as Category[];
    }
    catch (error: any) {
        console.log(error.statusText, error.status);
        console.error("ERROR:",error.message);
    }
}

export const createExpense = async (category: Category): Promise<void> => {
    const access_token = await getSession()
    try {
        const response = await fetch(`${url}/categories`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${{ access_token }}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

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

export const deleteExpense = async (categoryId: number) => {
    const access_token = await getSession()
    try {
        const response = await fetch(`${url}/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${{access_token}}`
            },
        })
        return true;
    } catch (error) {
        console.error(error);
    }
}
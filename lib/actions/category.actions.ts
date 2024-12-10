"use server"

import {Category} from "@/lib/entities";
import {getSession} from "@/lib/auth/actions";

const url = process.env.NEXT_PUBLIC_API_URL

const access_token = await getSession()

const fetchCategory = async ()=> {
    try {
        const response = await fetch(`${url}/categories`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`
            },
        });
        return await response.json() as Category[];
    }
    catch (error) {
        console.error(error);
    }
}

export const createExpense = async (category: Category): Promise<void> => {
    try {
        const response = await fetch(`${url}/categories`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(category)
        });
    } catch (error) {
        console.error(error);
    }
}

export const updateExpense = async ({expenseId, payload}: {expenseId: number, payload: Category}): Promise<void> => {
    try {
        const response = await fetch(`${url}/categories/${expenseId}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(payload),
        })
    } catch (error) {
        console.error(error);
    }
}

export const deleteExpense = async (categoryId: number) => {
    try {
        const response = await fetch(`${url}/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`
            },
        })
        return true;
    } catch (error) {
        console.error(error);
    }
}
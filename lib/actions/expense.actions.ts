"use server"

import {Expense} from "@/lib/entities";
import {getSession} from "@/lib/auth/session";

const url = process.env.NEXT_PUBLIC_API_URL

interface FetchExpenseType {
    limit?: number,
    offset?: number,
    start_date?: string,
    end_date?: string,
    name?: string,
    category_id?: string,
    keyword?: string,
}

export const fetchExpense = async ({limit, offset}: FetchExpenseType) => {
    const access_token = await getSession()
    const fullUrl = limit ? `${url}/expenses/?limit=${limit}` : `${url}/expenses/`;
    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token?.access_token}`
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Fetch failed');
        }

        return await response.json() as Expense[];
    }
    catch (error: any) {
        console.error(error.detail || 'Fetch failed');
    }
}

export const createExpense = async (expense: Expense): Promise<void> => {
    const access_token = await getSession()
    try {
        const response = await fetch(`${url}/expenses`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(expense)
        });
    } catch (error) {
        console.error(error);
    }
}

export const updateExpense = async ({expenseId, payload}: {expenseId: number, payload: Expense}): Promise<void> => {
    const access_token = await getSession()
    try {
        const response = await fetch(`${url}/expenses/${expenseId}`, {
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

export const deleteExpense = async (expenseId: number) => {
    const access_token = await getSession()
    try {
        const response = await fetch(`${url}/expenses/${expenseId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token?.access_token}`
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to delete expense. Status: ${response.status}`);
        }

        return true;
    } catch (error: any) {
        console.error("Error deleting expense:", error.message);
        return false;
    }
}
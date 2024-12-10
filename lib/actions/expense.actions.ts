"use server"

import {Expense} from "@/lib/entities";
import {getSession} from "@/lib/auth/actions";

const url = process.env.NEXT_PUBLIC_API_URL

const access_token = await getSession()

interface FetchExpenseType {
    limit?: number,
    offset?: number,
    start_date?: string,
    end_date?: string,
    name?: string,
    category_id?: string,
    keyword?: string,
}

export const fetchExpense = async ({limit, offset}: FetchExpenseType)=> {
    const fullUrl = limit ? `${url}?limit=${limit}` : `${url}/expenses`;
    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`
            },
        });
        return await response.json() as Expense[];
    }
    catch (error) {
        console.error(error);
    }
}

export const createExpense = async (expense: Expense): Promise<void> => {
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
    try {
        const response = await fetch(`${url}/expenses/${expenseId}`, {
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
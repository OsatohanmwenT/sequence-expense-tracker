"use server"

import {Expense, Expenses} from "@/lib/entities";
import {getSession} from "@/lib/auth/session";
import {revalidatePath} from "next/cache";

const url = process.env.NEXT_PUBLIC_API_URL

export interface FetchExpenseType {
    limit?: number,
    offset?: number,
    start_date?: string,
    end_date?: string,
    name?: string,
    category_name?: string,
    keyword?: string,
}

export const fetchExpense = async (filters: FetchExpenseType, preUrl: string | null) => {
    const access_token = await getSession()
    const queryParams = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                acc[key] = String(value); // Add valid filters to query string
            }
            return acc;
        }, {} as Record<string, string>)
    );
    const adjustedUrl = preUrl?.split("?")
    const normalizedUrl = adjustedUrl?.join("/?")

    const fullUrl = preUrl ? `${url}${normalizedUrl}` : `${url}/expenses/?${queryParams.toString()}`;

    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access_token?.access_token}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Fetch failed');
        }

        const data = await response.json();
        return data as Expenses;
    }
    catch (error: any) {
        console.error(error.detail || 'Fetch failed');
    }
}

export const createExpense = async (expense: Expense) => {
    const access_token = await getSession()

    try {
        const response = await fetch(`${url}/expenses/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token?.access_token}`,
            },
            body: JSON.stringify(expense)
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData?.detail || `Error ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        revalidatePath("/dashboard");

        return await response.json()
    } catch (error: any) {
        throw new Error(error.message || "Failed to create expense.");
    }
}

export const updateExpense = async (expenseId: number | undefined, expense: Expense, path: string) => {
    const access_token = await getSession()
    try {
        const response = await fetch(`${url}/expenses/${expenseId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token?.access_token}`
            },
            body: JSON.stringify(expense),
        })

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData?.detail || `Error ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        revalidatePath(path);
        return await response.json()
    } catch (error: any) {
        throw new Error(error.message || "Failed to create expense.");
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

        revalidatePath("/dashboard");

        return true;
    } catch (error: any) {
        console.error("Error deleting expense:", error.message);
        return false;
    }
}
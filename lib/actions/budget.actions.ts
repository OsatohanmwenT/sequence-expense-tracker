"use server"

import {BudgetCategory} from "@/lib/entities";
import {getSession} from "@/lib/auth/session";
import {revalidatePath} from "next/cache";
import {BudgetFormValues} from "@/lib/schemas";

const url = process.env.NEXT_PUBLIC_API_URL;

//CATEGORY BUDGET

export const fetchAllBudgets = async () => {
    const session = await getSession();
    try {
        const response = await fetch(`${url}/category_budgets/`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to fetch all budgets.");
        }

        return await response.json() as BudgetCategory[];
    } catch (error) {
        console.error(error);
    }
}

export const fetchBudgets = async (category_name: string) => {
    const session = await getSession();
    try {
        const response = await fetch(`${url}/category_budgets/${category_name}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to fetch all budgets.");
        }

        return await response.json() as BudgetCategory;
    } catch (error: any) {
        console.error("Fetch Budgets Error:", error.message);
        throw error;
    }
}

export const deactivateBudget = async (category_name: string) => {
    const session = await getSession();
    try {
        const response = await fetch(`${url}/category_budgets/${category_name}/deactivate`,{
            method: "POST",
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

export const createBudget = async (path: string, budget: BudgetFormValues) => {
    const session = await getSession();
    try {
        const response = await fetch(`${url}/budget/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify(budget),
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to update budget.");
        }

        revalidatePath(path);
        return await response.json();
    } catch (error: any) {
        console.error("Error updating budget:", error.message);
        throw error;
    }
}

export const editBudget = async (path: string, budget: BudgetFormValues) => {
    const session = await getSession();
    try {
        const response = await fetch(`${url}/budget/`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify(budget),
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to update budget.");
        }

        revalidatePath(path);
        return await response.json();
    } catch (error: any) {
        console.error("Error updating budget:", error.message);
        throw error;
    }
}

export const editBudgetCategory = async (category_name: string, path: string, budget: BudgetFormValues) => {
    const session = await getSession();
    try {
        const response = await fetch(`${url}/category_budgets/${category_name}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token}`,
            },
            body: JSON.stringify(budget),
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Failed to update budget.");
        }

        revalidatePath(path);
        return await response.json();
    } catch (error: any) {
        console.error("Error updating budget:", error.message);
        throw error;
    }
}


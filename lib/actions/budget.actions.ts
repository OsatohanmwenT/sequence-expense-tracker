import {BudgetCategory} from "@/lib/entities";
import {getSession} from "@/lib/auth/session";

const url = process.env.NEXT_PUBLIC_API_URL;

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
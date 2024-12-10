import {AnalyticsDaily, BudgetSummary} from "@/lib/entities";
import {getSession} from "@/lib/auth/actions";

const url = process.env.NEXT_PUBLIC_API_URL

export const fetchSummary = async (): Promise<BudgetSummary | null> => {
    const session = await getSession();
    const token = session?.access_token.value;

        const response = await fetch(`${url}/analytics/summary`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        const result = await response.json();
        return result as BudgetSummary;
}

export const fetchDailyExpenses = async () => {
        const session = await getSession();
        const response = await fetch(`${url}/daily`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token.value}`,
            },
        });

        return (await response.json()) as AnalyticsDaily;
};
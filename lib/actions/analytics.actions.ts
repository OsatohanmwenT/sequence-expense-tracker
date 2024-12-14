import {AnalyticsTrends, BudgetSummary} from "@/lib/entities";
import {getSession} from "@/lib/auth/session";

const url = process.env.NEXT_PUBLIC_API_URL

export const fetchSummary = async (): Promise<BudgetSummary | null> => {
    const session = await getSession();
    const token = session?.access_token;

    try {
        const response = await fetch(`${url}/analytics/summary`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            console.error("API Error:", await response.text());
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return result as BudgetSummary;
    } catch (error) {
        console.error("Fetch summary failed:", error);
        return null;
    }
}

export const fetchTrends = async () => {
        const session = await getSession();
        try {
            const response = await fetch(`${url}/analytics/trends`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.access_token}`,
                },
            });
            if (!response.ok) {
                console.error("API Error:", await response.text());
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            return result as AnalyticsTrends;
        } catch (error) {
            console.error("Fetch summary failed:", error);
            return null;
        }
};

export const exportExpenses = async () => {
    const session = await getSession(); // Fetch session for authentication
    const token = session?.access_token;

    try {
        const response = await fetch(`${url}/analytics/export?format=csv`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("API Error:", await response.text());
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        // Convert response to a Blob for file download
        const blob = await response.blob();
        return blob; // Return file content as a blob
    } catch (error) {
        console.error("Fetch summary failed:", error);
        return null;
    }
};

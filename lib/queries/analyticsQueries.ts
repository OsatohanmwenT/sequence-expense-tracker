import { useQuery } from '@tanstack/react-query'
import {BudgetSummary,AnalyticsTrends} from "@/lib/entities"
import { getSession } from "@/lib/auth/session"

const url = process.env.NEXT_PUBLIC_API_URL

async function fetchWithAuth(endpoint: string) {
    const session = await getSession()
    const token = session?.access_token

    const response = await fetch(`${url}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export function useSummary() {
    return useQuery<BudgetSummary>({
        queryKey: ['summary'],
        queryFn: () => fetchWithAuth('/analytics/summary'),
    })
}

export function useTrendsData() {
    return useQuery<AnalyticsTrends, Error>({
        queryKey: ['trends'],
        queryFn: () => fetchWithAuth('/analytics/trends'),
    })
}


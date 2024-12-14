import React from 'react'
import {fetchSummary} from "@/lib/actions/analytics.actions";
import {formatNumber} from "@/lib/utils";
import CategoryOverview from "@/components/CategoryOverview";

const Page = async () => {
    const summary = await fetchSummary()

    return (
        <div className="p-5">
            <section>
                <h1 className="text-4xl font-inter font-semibold">My Budgets</h1>
                <p>Total amount: {formatNumber(summary?.budget_limit)}</p>
            </section>
            <CategoryOverview />
        </div>
    )
}
export default Page

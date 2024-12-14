import React from 'react'
import CategoryOverview from "@/components/CategoryOverview";

const Page = async () => {
    return (
        <div className="p-5">
            <section>
                <h1 className="text-4xl font-inter font-semibold">My Budgets</h1>
            </section>
            <CategoryOverview />
        </div>
    )
}
export default Page

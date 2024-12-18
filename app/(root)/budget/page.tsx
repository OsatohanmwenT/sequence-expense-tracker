import React from 'react'
import CategoryOverview from "@/components/section/CategoryOverview";
import AddCategory from "@/components/Buttons/AddCategory";
import {fetchSummary} from "@/lib/actions/analytics.actions";
import Link from "next/link";
import AddBudget from "@/components/Buttons/AddBudget";
import EditBudget from "@/components/Buttons/EditBudget";

const Page = async () => {
    const budget = await fetchSummary()

    return (
        <div className="p-5 min-h-screen bg-neutral-100">
            <section className="flex-between gap-2 max-md:flex-col">
                <h1 className="text-lg sm:text-3xl text-nowrap font-inter font-semibold">My Budgets</h1>
                <div className="flex items-center max-md:flex-wrap max-sm:mb-2 max-xs:self-end gap-3">
                    <AddCategory type="Add Category" />
                    <Link
                        href="/budget/history"
                        className="font-semibold font-work-sans btn"
                    >
                        History
                    </Link>
                    <AddBudget />
                    <EditBudget />
                </div>
            </section>
            <section>
                <p className="font-inter mb-3 text-lg">Overview</p>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-[1px] bg-white border-black/300 rounded-xl p-5">
                        <div>
                            <p className="heading_title !text-base sm:!text-lg lg:!text-xl">Total Budget </p>
                        </div>
                    </div>
                    <div className="border-[1px] bg-white border-black/300 rounded-xl p-5"></div>
                </section>
            </section>
            <CategoryOverview />
        </div>
    )
}
export default Page

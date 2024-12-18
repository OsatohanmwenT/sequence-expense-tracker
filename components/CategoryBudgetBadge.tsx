import React from 'react'
import StatusTag from "@/components/StatusTag";
import {fetchAllBudgets} from "@/lib/actions/budget.actions";

interface Props {
    status: string;
    category_name: string;
}

const CategoryBudgetBadge = async () => {
    const budgets = await fetchAllBudgets()

    if (!budgets) {
        return <p className="text-red-500 text-xl text-center">No Budgets</p>
    }

    return (
        <>
            <p className="p-3 font-inter border-b-2">Budget Status</p>
            {budgets.map((budget) => (
                <div className="px-3 py-4 flex-between border-b-[1px] last:border-none">
                    <span className="font-work-sans font-semibold text-lg">{budget.category_name}</span>
                    <StatusTag status={budget.status} />
                </div>
            ))

            }
        </>
    )
}
export default CategoryBudgetBadge

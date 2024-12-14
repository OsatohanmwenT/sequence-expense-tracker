import React from 'react'
import Link from "next/link";
import {BudgetCategory} from "@/lib/entities";

const BudgetCard = ({ category_name, amount_limit, amount_used }: BudgetCategory) => {
    const remainingPercentage = amount_limit
        ? Math.max(0, 100 - ((amount_limit - amount_used) / amount_limit) * 100)
        : 0;

    return (
        <Link className="hover:shadow-xl transition-all rounded-lg" href={`/budget/category_budget/${category_name}`}>
            <div className="border-[1px] font-work-sans py-5 px-3 rounded-lg">
                <div className="flex-between">
                    <p className="font-semibold font-work-sans text-lg">{category_name}</p>
                    <p className="text-neutral-600 font-semibold">€{amount_limit}</p>
                </div>
                <div className="mt-2">
                    <div className="flex-between text-sm text-neutral-400 mb-2">
                        <p>€{amount_used} spent</p>
                        <p>€{amount_limit - amount_used} remaining</p>
                    </div>
                    <div className="w-full relative h-[6px] bg-light-green-100 rounded-lg">
                        <div style={{ width: `${remainingPercentage}%` }} className="h-full rounded-lg bg-green-200 w-4/6 hover:w-full transition-all duration-500"></div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default BudgetCard

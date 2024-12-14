import React from 'react'
import Link from "next/link";
import {BudgetCategory} from "@/lib/entities";
import {format} from "date-fns";
import {formatNumber} from "@/lib/utils";

const BudgetCard = ({ category_name, amount_limit, amount_used, start_date, end_date }: BudgetCategory) => {
    const remainingPercentage = amount_limit
        ? Math.max(0, 100 - ((amount_limit - amount_used) / amount_limit) * 100)
        : 0;

    const remainingAmount = amount_limit && amount_limit - amount_used > 0 ?
        amount_limit - amount_used : 0

    return (
        <Link className="hover:shadow-xl h-fit transition-all rounded-lg" href={`/budget/category_budget/${category_name}`}>
            <div className="border-[1px] font-work-sans py-5 px-3 rounded-lg">
                <div className="flex-between">
                    <p className="font-semibold font-work-sans text-lg">{category_name}</p>
                    <p className="text-neutral-600 font-semibold">€{amount_limit}</p>
                </div>
                <div className="mt-2">
                    <div className="flex-between text-sm text-neutral-400 mb-3">
                        <p>€{amount_used} spent</p>
                        <p>€{remainingAmount} remaining</p>
                    </div>
                    <div className="w-full overflow-hidden relative h-[6px] bg-light-green-100 rounded-lg">
                        <div style={{width: `${remainingPercentage}%`}}
                             className="h-full rounded-lg bg-green-200 w-4/6 hover:w-full transition-all duration-500"></div>
                    </div>
                    <div className="flex-between text-sm text-neutral-400 mt-5">
                        <p>from {format(start_date,"PP")}</p>
                        <p>to {format(end_date, "PP")}</p>
                    </div>
                    {amount_used > amount_limit &&
                        <div className="flex items-center">
                            <p className="text-red-400">Overspent by: £{formatNumber(amount_used-amount_limit)}</p>
                        </div>
                    }
                </div>
            </div>
        </Link>
    )
}
export default BudgetCard

import React from 'react'
import {BudgetCategory} from "@/lib/entities";
import {format} from "date-fns";
import {formatNumber} from "@/lib/utils";
import StatusTag from "@/components/StatusTag";

const BudgetCard = ({ category_name, amount_limit, amount_used, start_date, end_date, status }: BudgetCategory) => {
    console.log(amount_limit, amount_used);

    const remainingPercentage = amount_limit && amount_used
        ? Math.max(0, 100 - ((amount_limit - amount_used) / amount_limit) * 100)
        : 0;

    const remainingAmount = Math.max(0, (amount_limit || 0) - (amount_used || 0));

    return (
    <div className="border-[1px] font-work-sans py-5 px-3 rounded-lg">
        <div className="flex items-center justify-end">
        </div>
        <div className="flex-between">
            <p className="font-semibold font-work-sans text-lg">{category_name}</p>
            <p className="text-neutral-600 font-semibold">€{amount_limit}</p>
        </div>
        <div className="mt-2">
            <div className="flex-between text-sm text-neutral-400 mb-3">
                <p>€{amount_used || 0} spent</p>
                <p>€{remainingAmount} remaining</p>
            </div>
            <div className="w-full overflow-hidden relative h-[6px] bg-light-green-100 rounded-lg">
                <div style={{width: `${remainingPercentage}%`}}
                     className="h-full rounded-lg bg-green-200 transition-all duration-500"></div>
            </div>
            <div className="flex-between text-sm text-neutral-400 mt-5">
                <p>from {format(start_date || new Date(), "PP")}</p>
                <p>to {format(end_date || new Date(), "PP")}</p>
            </div>
            {amount_used > amount_limit &&
                <div className="flex items-center">
                    <p className="text-red-400 max-[320px]:text-xs">Overspent by:
                        £{formatNumber(amount_used - amount_limit)}</p>
                </div>
            }
        </div>
        <div className="font-work-sans mt-3 flex items-baseline justify-between gap-2">
            <p>Status:</p>
            <StatusTag status={status}/>
        </div>
    </div>
)
}
export default BudgetCard

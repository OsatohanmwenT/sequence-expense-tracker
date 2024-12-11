import React from 'react'
import {formatNumber} from "@/lib/utils/utils";
import {Banknote, PiggyBank} from "lucide-react";

interface AnalyticsCardProps {
    title: string
    amount: number
    extra?: string
}

const AnalyticsCard = ({title, amount,extra}: AnalyticsCardProps) => {
    return (
        <div className="flex flex-col p-3 rounded-lg border-2">
            <div className="font-inter mb-3 text-nowrap flex-between gap-5 text-sm">
                <div className="flex items-center gap-2">
                    {title === "Highest Category Spending" && <Banknote className="size-5 text-light-green rotate-45" />}
                    {title === "Days Spent within Budget" && <PiggyBank className="size-5 text-light-green" />}
                    <p>{title}</p>
                </div>
                <p className="text-green-100">Last 30 days</p>
            </div>
            <div>
                <p className="text-3xl font-work-sans font-semibold">£ {formatNumber(amount)}</p>
            </div>
                <p className="text-neutral-500 mt-2 text-sm">{(extra) ||"vs Last Period"}</p>
        </div>
    )
}
export default AnalyticsCard

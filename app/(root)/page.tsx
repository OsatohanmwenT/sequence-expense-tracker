"use client"

import React from "react";
import {formatNumber} from "@/lib/utils";
import ChartSection from "@/components/ChartSection";
import AnalyticsCard from "@/components/AnalyticsCard";
import ExpenseOverview from "@/components/ExpenseOverview";
import CategoryBudgetList from "@/components/CategoryBudgetList";
import AddButton from "@/components/AddButton";
import {Toaster} from "@/components/ui/toaster";
import {useSummary} from "@/lib/queries/analyticsQueries";
import {Skeleton} from "@/components/ui/skeleton";

const Page = () => {
    const { data: summary, isLoading } = useSummary()

    const budgetLimit = summary?.budget_limit || 0;
    const totalExpenses = summary?.total_expenses || 0;
    const amountRemaining = budgetLimit - totalExpenses;
    const percentageRemaining = budgetLimit ? (amountRemaining / budgetLimit) * 100 : 0;

    return (
        <>
            <section className="px-3">
                <h1 className="font-semibold font-inter text-xl md:text-3xl mb-2">
                    Welcome back, <span>{<span aria-label="Guest user">Guest</span>}</span>
                </h1>
            </section>
            <section className="bg-green mt-2 mb-4 flex-between rounded-2xl px-6 py-5 mx-3">
                <div>
                    <p className="text-white font-work-sans text-xs sm:text-sm mb-1">Total Amount Remaining</p>
                    {isLoading ? (
                        <Skeleton className="h-6 w-24 bg-gray-400" />
                    ) : (
                        <p className="text-xl sm:text-4xl font-work-sans font-semibold text-white">
                            € {formatNumber(amountRemaining)}{" "}
                            <span className="text-xs text-light-green">
                                +{formatNumber(percentageRemaining)}%
                            </span>
                        </p>
                        )
                    }
                </div>
                <div>
                    <AddButton type="yes" />
                </div>
            </section>
            <ChartSection summary={summary} />
            <section className="px-4 my-3 grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnalyticsCard title="Highest Category Spending" amount={15000} extra="You spent most of your money this month on Food" />
                <AnalyticsCard title="Days Spent within Budget" amount={20000} />
                <AnalyticsCard title="Highest Category Spending" amount={3000} />
            </section>
            <section className="grid grid-cols-1 xl:grid-cols-3 px-4 gap-2 mb-4">
                <ExpenseOverview/>
                <CategoryBudgetList />
            </section>
            <Toaster />
        </>
    );
};

export default Page;

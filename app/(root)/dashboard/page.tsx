import React from "react";
import {formatNumber} from "@/lib/utils";
import ChartSection from "@/components/section/ChartSection";
import AnalyticsCard from "@/components/Card/AnalyticsCard";
import ExpenseOverview from "@/components/section/ExpenseOverview";
import CategoryBudgetList from "@/components/Lists/CategoryBudgetList";
import AddButton from "@/components/Buttons/AddButton";
import {Skeleton} from "@/components/ui/skeleton";
import AnimatedCounter from "@/components/AnimatedCounter";
import {fetchSummary} from "@/lib/actions/analytics.actions";
import {getSession} from "@/lib/auth/session";

const Page = async () => {
    const user = await getSession()
    const summary = await fetchSummary();
    const isLoading = false

    const budgetLimit = summary?.budget_limit || 0;
    const totalExpenses = summary?.total_expenses || 0;
    const amountRemaining = budgetLimit && totalExpenses < budgetLimit ? budgetLimit - totalExpenses : 0;
    const percentageRemaining = budgetLimit ? (amountRemaining / budgetLimit) * 100 : 0;

    return (
        <>
            <section className="px-3">
                <h1 className="font-semibold font-inter text-xl md:text-3xl mb-2">
                    Welcome back, <span>{ user?.userData ||<span aria-label="Guest user">Guest</span>}</span>
                </h1>
            </section>
            <section className="bg-green mt-2 mb-4 flex-between rounded-2xl px-6 py-5 mx-3">
                <div>
                    <p className="text-white font-work-sans text-xs sm:text-sm mb-1">Total Amount Remaining</p>
                    {isLoading ? (
                        <Skeleton className="h-6 w-24 bg-white/40" />
                    ) : (
                        <p className="text-xl sm:text-4xl font-work-sans font-semibold text-white">
                            € <AnimatedCounter value={amountRemaining} />{" "}
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
                <AnalyticsCard title="Highest Category Spending" amount={0} extra="You spent most of your money this month on Food" />
                <AnalyticsCard title="Days Spent within Budget" amount={0} />
                <AnalyticsCard title="Highest Category Spending" amount={0} />
            </section>
            <section className="grid grid-cols-1 xl:grid-cols-3 px-4 gap-2 mb-4">
                <ExpenseOverview/>
                <CategoryBudgetList />
            </section>
        </>
    );
};

export default Page;

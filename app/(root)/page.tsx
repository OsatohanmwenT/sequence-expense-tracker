import React from "react";
import {Plus, ArrowUp, ArrowLeftRight} from "lucide-react";
import {fetchSummary} from "@/lib/actions/analytics.actions";
import {getSession} from "@/lib/auth/session";
import {formatNumber} from "@/lib/utils/utils";
import {BarChartComponent as BarChart} from "@/components/charts/BarChart";
import NavBar from "@/components/NavBar";
import ChartSection from "@/components/ChartSection";
import AnalyticsCard from "@/components/AnalyticsCard";

const Page = async () => {
    const user = await getSession();
    const summary = await fetchSummary();

    const amountRemaining =
        summary?.budget_limit
            ? (summary.budget_limit - summary.total_expenses)
            : 0;

    const percentageRemaining =
        summary?.budget_limit
            ? (((summary.budget_limit - summary.total_expenses) /
                    summary.budget_limit) *
                100)
            : 0;

    return (
        <>
            <NavBar />
            <section className="px-3">
                <h1 className="font-semibold font-inter text-xl md:text-3xl mb-2">
                    Welcome back, <span>{user?.userData || "Guest"}</span>
                </h1>
            </section>
            <section className="bg-green mt-2 mb-4 flex-between rounded-2xl px-6 py-5 mx-3">
                <div>
                    <p className="text-white font-work-sans text-sm mb-1">Total Amount Remaining</p>
                    <p className="text-4xl font-work-sans font-semibold text-white">
                        £ {formatNumber(amountRemaining)}{" "}
                        <span className="text-xs text-light-green">
                            +{formatNumber(percentageRemaining)}%
                        </span>
                    </p>
                </div>
                <div>
                    <button className="bg-light-green flex-between gap-1 hover:bg-light-green-200 transition-all text-green px-3 py-2 rounded-lg">
                        <Plus className="size-5" />
                        Add
                    </button>
                </div>
            </section>
            <ChartSection summary={summary} />
            <section className="px-4 my-3 grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnalyticsCard title="Highest Category Spending" amount={15000} extra="You spent most of your money this month on Food" />
                <AnalyticsCard title="Days Spent within Budget" amount={20000} />
                <AnalyticsCard title="Highest Category Spending" amount={3000} />
            </section>
            <section></section>

        </>
    );
};

export default Page;

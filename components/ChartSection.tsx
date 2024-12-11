"use client";

import React, { useState } from "react";
import { ArrowLeftRight, ArrowUp } from "lucide-react";
import { BarChartComponent as BarChart } from "@/components/charts/BarChart";
import { formatNumber } from "@/lib/utils";
import {BudgetSummary} from "@/lib/entities";

const ChartSection = ({ summary }: { summary: BudgetSummary | null }) => {
    const [view, setView] = useState("monthly");

    const percentageRemaining =
        summary?.budget_limit
            ? (((summary.budget_limit - summary.total_expenses) /
                    summary.budget_limit) *
                100)
            : 0;

    return (
        <section className="chart-section shadow-sm">
            <div className="px-6 flex-between">
                <div className="flex gap-2 items-center">
                    <p className="font-helvetica text-green">Cash Flow</p>
                    <ArrowLeftRight className="size-5 text-light-green" />
                </div>
                <div className="flex relative rounded-md bg-gray-200 p-1">
                    <button
                        onClick={() => setView("weekly")}
                        className={`font-inter px-3 rounded-md text-sm py-1 ${view === "weekly" ? "bg-white" : ""}`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setView("monthly")}
                        className={`font-inter px-3 rounded-md text-sm py-1 ${view === "monthly" ? "bg-white" : ""}`}
                    >
                        Monthly
                    </button>
                </div>
            </div>
            <div className="chart-section_grid">
                <div className="chart">
                    <BarChart />
                </div>
                <div className="xl:border-b-2 lg:max-xl:border-r-2 max-lg:border-b-2 max-lg:pb-2 chart-card">
                    <div className="bg-green p-3 rounded-lg flex items-center">
                        <ArrowUp className="size-6 text-white -rotate-[135deg]" />
                    </div>
                    <div className="flex flex-col gap-3 justify-between">
                        <p className="font-work-sans">Overall Budget</p>
                        <div className="chart-card_info">
                            <p>€ {formatNumber(summary?.budget_limit)}</p>
                            <div className="flex text-light-green items-center">
                                <span className="text-xs font-inter">+{formatNumber(percentageRemaining)}%</span>
                                <ArrowUp className="size-4 rotate-45" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chart-card">
                    <div className="bg-light-green-400 p-3 rounded-lg flex items-center">
                        <ArrowUp className="size-6 text-white rotate-45" />
                    </div>
                    <div className="flex flex-col gap-3 justify-between">
                        <p className="font-work-sans">Total Expense</p>
                        <div className="chart-card_info">
                            <p>€ {formatNumber(summary?.total_expenses)}</p>
                            <div className="flex text-red-500 items-center">
                                <span className="text-xs font-inter">-{formatNumber(percentageRemaining)}%</span>
                                <ArrowUp className="size-4 rotate-[135deg]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChartSection;

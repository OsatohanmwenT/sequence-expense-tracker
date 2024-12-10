import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchInput from "@/components/SearchInput";
import CalendarRange from "@/components/CalendarRange";
import { Download, Plus, ArrowUp } from "lucide-react";
import {fetchSummary} from "@/lib/actions/analytics.actions";
import { getSession } from "@/lib/auth/actions";
import {formatNumber} from "@/lib/utils";

const Page = async () => {
    const user = await getSession();
    const summary = await fetchSummary();

    const amountRemaining =
        summary?.budget_limit
            ? (summary.budget_limit - summary.total_expenses).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            : 0;

    const percentageRemaining =
        summary?.budget_limit
            ? (((summary.budget_limit - summary.total_expenses) /
                    summary.budget_limit) *
                100)
            : 0;

    return (
        <>
            <section className="w-full px-2 py-3 flex-between">
                <div className="flex items-center">
                    <SidebarTrigger />
                    <hr className="border-[1px] max-sm:hidden rounded-md ml-2 mr-4 h-[25px] w-[1px]" />
                    <SearchInput />
                </div>
                <div className="flex items-center gap-1 md:gap-3">
                    <CalendarRange />
                    <button
                        aria-label="export button"
                        className="flex items-center hover:translate-y-[1px] transition-all md:bg-green-200 px-3 py-2 rounded-md md:text-white"
                    >
                        <Download className="size-5 md:mr-1" />
                        <span className="max-md:hidden">Export</span>
                    </button>
                </div>
            </section>
            <section className="px-3">
                <h1 className="font-semibold text-xl md:text-3xl mb-2">
                    Welcome back, <span>{user?.userData?.value || "Guest"}</span>
                </h1>
            </section>
            <section className="bg-green mt-2 mb-4 flex-between rounded-2xl px-6 py-5 mx-3">
                <div>
                    <p className="text-white text-sm mb-1">Total Amount Remaining</p>
                    <p className="text-4xl md:text-4xl font-semibold text-white">
                        £ {amountRemaining}{" "}
                        <span className="text-xs text-light-green">
                            +{percentageRemaining.toFixed(2)}%
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
            <section className="border-2 flex flex-col border-gray-200 rounded-2xl py-5 mx-3">
                <div className="mb-6"></div>
                <div className="grid grid-cols-3 grid-rows-2">
                    <div className="col-span-2 border-r-2 h-[300px] row-span-2"></div>
                    <div className="border-b-2 chart-card">
                        <div className="bg-green p-3 rounded-lg flex items-center">
                            <ArrowUp className="size-6 text-white -rotate-[135deg]" />
                        </div>
                        <div className="flex flex-col gap-3 justify-between">
                            <p>Overall Budget</p>
                            <p className="font-medium text-2xl xl:text-4xl text-start">£ {formatNumber(summary?.budget_limit)}</p>
                        </div>
                    </div>
                    <div className="chart-card">
                        <div className="bg-light-green-400 p-3 rounded-lg flex items-center">
                            <ArrowUp className="size-6 text-white rotate-45" />
                        </div>
                        <div></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;

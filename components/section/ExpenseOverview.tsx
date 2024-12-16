"use client"

import React, {useState} from 'react'
import {Activity} from "lucide-react";
import SortSelect from "@/components/forms/SortSelect";
import ExpenseList from "@/components/Lists/ExpenseList";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import {deleteExpense} from "@/lib/actions/expense.actions";
import {showToast} from "@/lib/utils/toast";
import {useQueryClient} from "@tanstack/react-query";
import {useExpenses} from "@/lib/queries/expenseQueries";

const ExpenseOverview = () => {
    const [filterBy, setFilterBy] = useState<string | null>(null);
    const { data: expenses, isLoading } = useExpenses({ category_name: filterBy || undefined, limit: 10 })

    return (
        <>
            <div className="xl:col-span-2 border-2 rounded-lg">
                <div className="flex items-center py-4 px-5 justify-between">
                    <div className="flex items-center gap-3">
                        <Activity className="text-green size-5"/>
                        <p>Recent Activity</p>
                    </div>
                    <div>
                        <SortSelect setFilterBy={setFilterBy} />
                    </div>
                </div>
                <div>
                    {isLoading ? (<TableSkeleton />) : (<ExpenseList expenses={expenses} />)}
                </div>
            </div>
        </>
    )
}
export default ExpenseOverview

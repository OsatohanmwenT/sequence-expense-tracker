"use client"

import React, {useEffect, useState} from 'react'
import {Activity} from "lucide-react";
import SortSelect from "@/components/SortSelect";
import ExpenseList from "@/components/ExpenseList";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import {Expense} from "@/lib/entities";
import {deleteExpense, fetchExpense} from "@/lib/actions/expense.actions";

const ExpenseOverview = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [expenses, setExpenses] = useState<Expense[] | undefined>([])
    const [error, setError] = useState<string | null>(null);
    const [filterBy, setFilterBy] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const data = await fetchExpense({ limit: 5 })
                console.log(data)
                setExpenses(data)
            } catch (error: any) {
                setError(error.detail)
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleDeleteExpense = async (id: number | undefined) => {
        if (!id) return
        try {
            const response = await deleteExpense(id);
            if(response) {
                setExpenses(prevExpenses => prevExpenses?.filter(expense => expense.id !== id));
            }
        } catch (error) {
            setError("Failed to delete the expense. Please try again.");
            console.error(error);
        }
    }

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
                    {isLoading ? (<TableSkeleton />) : (<ExpenseList handleDeleteExpense={handleDeleteExpense} expenses={expenses} />)}
                </div>
            </div>
        </>
    )
}
export default ExpenseOverview

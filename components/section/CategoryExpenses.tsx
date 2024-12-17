import React from 'react'
import ExpenseList from "@/components/Lists/ExpenseList";
import {fetchExpense} from "@/lib/actions/expense.actions";

const CategoryExpenses = async ({id}: {id: string}) => {
    const expenses = await fetchExpense({ limit: 10, category_name: id });

    return (
        <>
            <div className="xl:col-span-2 border-2 rounded-lg">
                <div>
                    <ExpenseList expenses={expenses?.expenses} />
                </div>
                <div className="h-12 border-t-[1px]"></div>
            </div>
        </>
    )
}
export default CategoryExpenses

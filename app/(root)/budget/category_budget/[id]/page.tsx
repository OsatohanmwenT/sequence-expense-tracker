import React from 'react'
import {fetchBudgets} from "@/lib/actions/budget.actions";
import BudgetCard from "@/components/Card/BudgetCard";
import DeactivateButton from "@/components/Buttons/DeactivateButton";
import DeleteCategory from "@/components/Buttons/DeleteCategory";
import Form from "@/components/forms/Form";
import EditBudgetCategory from "@/components/Buttons/EditBudgetCategory";
import CategoryExpenses from "@/components/section/CategoryExpenses";

const Page = async ({params}: { params: Promise<{id: string}>}) => {
    const id = (await params).id
    const budget = await fetchBudgets(id)

    if (!budget) {
        return (
            <p className="text-red-500">No budget data found for this category.</p>
        )
    }

    return (
        <div className="px-3 mt-5">
            <div className="mb-3 flex-between">
                <div className="flex gap-2">
                    <EditBudgetCategory id={id} />
                    <DeactivateButton id={id} />
                    <DeleteCategory category_name={id} />
                </div>
            </div>
            <div className="grid items-start col-span-2 lg:grid-cols-3 gap-4">
                <div className="max-w-[500px] border-1 rounded-lg">
                    <Form id={id} />
                </div>
                <div className="lg:col-span-2">
                    <BudgetCard {...budget} category_name={id} />
                </div>
            </div>
            <div className="mt-8">
                <CategoryExpenses id={id} />
            </div>
        </div>
    )
}
export default Page

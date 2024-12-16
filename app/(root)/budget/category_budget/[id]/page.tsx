import React from 'react'
import {fetchBudgets} from "@/lib/actions/budget.actions";
import BudgetCard from "@/components/BudgetCard";
import {Edit} from "lucide-react";
import {Button} from "@/components/ui/button";
import DeactivateButton from "@/components/Buttons/DeactivateButton";
import DeleteCategory from "@/components/Buttons/DeleteCategory";

const Page = async ({params}: { params: Promise<{id: string}> }) => {
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
                    <Button className="flex bg-green-400 text-white rounded-sm items-center gap-2">
                        <Edit className="size-5"/>
                        Edit
                    </Button>
                    <DeactivateButton id={id} />
                    <DeleteCategory category_name={id} />
                </div>
            </div>
            <div>
                <BudgetCard {...budget} category_name={id} />
            </div>
        </div>
    )
}
export default Page

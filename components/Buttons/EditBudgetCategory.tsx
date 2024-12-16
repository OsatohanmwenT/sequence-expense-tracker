"use client"

import React, {useState} from 'react'
import {Edit} from "lucide-react";
import {Button} from "@/components/ui/button";
import EditDialog from "@/components/dialogs/EditDialog";
import {editBudget} from "@/lib/actions/budget.actions";
import {showToast} from "@/lib/utils/toast";
import {usePathname} from "next/navigation";
import {CategoryBudgetFormValues} from "@/lib/schemas";

const EditBudgetCategory = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname()

    const handleEdit = async (data: CategoryBudgetFormValues) => {
        setLoading(true);
        try {
            await editBudget(id, path, data);
            showToast({
                title: "Success!",
                description: "Budget updated successfully.",
                type: "success",
            });
        } catch (error : any) {
            console.error(error);
            showToast({
                title: "Error!",
                description: error.message || "Failed to create expense.",
                type: "error",
            });
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="flex bg-green-400 text-white rounded-sm items-center gap-2">
                <Edit className="size-5"/>
                Edit
            </Button>
            <EditDialog loading={loading} isOpen={isOpen} setIsOpen={setIsOpen} onEdit={handleEdit} />
        </>
    )
}
export default EditBudgetCategory

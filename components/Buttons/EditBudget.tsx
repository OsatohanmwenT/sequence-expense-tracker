"use client"

import React, {useState} from 'react'
import {Edit} from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import EditDialog from "@/components/dialogs/EditDialog";
import {BudgetFormValues} from "@/lib/schemas";
import {editBudget} from "@/lib/actions/budget.actions";
import {showToast} from "@/lib/utils/toast";

const EditBudget = () => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname()

    const handleEdit = async (data: BudgetFormValues) => {
        setLoading(true);
        try {
            await editBudget(path, data)
            showToast({
                title: "Success!",
                description: "Budget updated successfully.",
                type: "success",
            });
        } catch (error : any) {
            console.error(error);
            showToast({
                title: "Error!",
                description: error.message || "Failed to create budget.",
                type: "error",
            });
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="flex bg-black text-white rounded-sm items-center gap-2">
                <Edit className="size-5"/>
                Edit
            </Button>
            <EditDialog loading={loading} isOpen={isOpen} setIsOpen={setIsOpen} onEdit={handleEdit} isCategory={false} />
        </>
    )
}
export default EditBudget

"use client"

import React, {useState} from 'react'
import {Plus} from "lucide-react";
import ExpenseDialog from "@/components/dialogs/ExpenseDialog";

const AddButton = ({type}: { type: "yes" | "no" }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {type === "yes" ? (
                <button onClick={() => setIsOpen(true)}
                        className="bg-light-green flex-between gap-1 hover:bg-light-green-200 max-sm:text-sm transition-all
                    text-green px-2 py-1 sm:px-3 sm:py-2 rounded-lg">
                    <Plus className="size-5"/>
                    Add
                </button>
            ) : (
                <button onClick={() => setIsOpen(true)} className="text-base mx-auto">Add a new expense</button>
                )
            }
            <ExpenseDialog open={isOpen} setIsOpen={setIsOpen} type="create"/>
        </>
    )
}
export default AddButton

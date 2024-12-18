import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {useForm} from "react-hook-form";
import {BudgetFormValues, editBudgetSchema} from "@/lib/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import NumberFormField from "@/components/forms/NumberFormField";
import React, {useState} from "react";
import CalenderFormField from "@/components/forms/CalenderFormField";

interface Props {
    isOpen: boolean;
    loading: boolean;
    isCategory: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onEdit: (data: BudgetFormValues) => void;
}

export default function EditDialog({ isOpen, loading, setIsOpen, onEdit, isCategory }: Props) {
    const form = useForm<BudgetFormValues>({
        resolver: zodResolver(editBudgetSchema),
        defaultValues: {
            amount_limit: 0,
            start_date: "",
            end_date: "",
        }
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit {isCategory && "Category"} Budget</DialogTitle>
                    <DialogDescription>
                        Make changes to your budget here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onEdit)} className="grid gap-4 py-4">
                    <NumberFormField label="Amount" name="amount_limit" form={form} />
                    <CalenderFormField label="Start date" name="start_date" form={form} />
                    <CalenderFormField label="End date" name="end_date" form={form} />
                    <DialogFooter>
                        <Button type="submit">{loading ? "Saving..." : "Save changes"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

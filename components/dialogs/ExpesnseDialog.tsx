"use client"

import * as React from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {ExpenseFormValues, expenseSchema} from "@/lib/schemas";

import {usePostExpense} from "@/lib/queries/expenseQueries";
import {CategoryFormField} from "@/components/forms/SelectCategoryField";
import CalenderFormField from "@/components/forms/CalenderFormField";
import NumberFormField from "@/components/forms/NumberFormField";
import TextFormField from "@/components/forms/TextFormField";
import {useCategories} from "@/lib/queries/categoryQueries";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function ExpenseDialog({ open, setOpen }: Props) {
    const { mutate: createExpense } = usePostExpense();

    const { data: categories, isLoading } = useCategories();
    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            name: "",
            amount: 0,
            category_name: "",
            date: "",
        },
    })

    const onSubmit = (data: ExpenseFormValues) => {
        setOpen(false);
        createExpense(data, {
            onSuccess: () => form.reset(),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription>
                        Enter the details of your new expense here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <TextFormField label="Name" name="name" form={form} />
                        <NumberFormField label="Amount" name="amount" form={form} />
                        <CategoryFormField label="Category" form={form} categories={categories} isLoading={isLoading} />
                        <CalenderFormField label="Date" name="date" form={form} />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Expense</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


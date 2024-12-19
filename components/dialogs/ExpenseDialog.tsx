"use client"

import React, {useEffect, useState} from "react";
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
import {CategoryFormField} from "@/components/forms/SelectCategoryField";
import CalenderFormField from "@/components/forms/CalenderFormField";
import NumberFormField from "@/components/forms/NumberFormField";
import TextFormField from "@/components/forms/TextFormField";
import {useCategories} from "@/lib/queries/categoryQueries";
import {createExpense, updateExpense} from "@/lib/actions/expense.actions";
import {showToast} from "@/lib/utils/toast";
import {useQueryClient} from "@tanstack/react-query";
import {usePathname} from "next/navigation";
import {Expense} from "@/lib/entities";

interface Props {
    open: boolean;
    setIsOpen: (open: boolean) => void;
    type: "create" | "update";
    initialValues?: Expense | null;
}

export default function ExpenseDialog({ open, setIsOpen, type, initialValues }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const path = usePathname()
    const queryClient = useQueryClient();
    const { data: categories, isLoading: categoriesLoading } = useCategories();
    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            name: "",
            amount: 0,
            category_name: "",
            date: "",
        },
    })

    useEffect(() => {
        if (initialValues) {
            form.reset(initialValues);
        }
    }, [initialValues, form]);

    const onSubmit = async (data: ExpenseFormValues) => {
        setIsLoading(true);
        console.log(data)
        try {
            if (type === "update") {
                await updateExpense(initialValues?.id, data, path);
                showToast({
                    title: "Success!",
                    description: "Expense updated successfully.",
                    type: "success",
                });
            } else {
                await createExpense(data);
                showToast({
                    title: "Success!",
                    description: "Expense added successfully.",
                    type: "success",
                });
            }
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
            form.reset()
            setIsOpen(false);
        } catch (error: any) {
            console.error(error);
            showToast({
                title: "Error!",
                description: error.message || "Failed to create expense.",
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{type === "create" ? "Add" : "Update"} Expense</DialogTitle>
                    <DialogDescription>
                        Enter the details of your new expense here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
                    <div className="grid gap-4 py-4">
                        <TextFormField<ExpenseFormValues>  label="Name" name="name" form={form} />
                        <NumberFormField<ExpenseFormValues> label="Amount" name="amount" form={form} />
                        <CategoryFormField<ExpenseFormValues> label="Category" form={form} categories={categories} isLoading={categoriesLoading} />
                        <CalenderFormField<ExpenseFormValues> label="Date" name="date" form={form} />
                    </div>
                    <DialogFooter>
                        <Button type="submit">{isLoading ? "Saving..." : "Save Expense"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


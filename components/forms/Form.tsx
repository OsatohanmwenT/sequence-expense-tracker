"use client"

import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {expenseBudgetSchema, expenseBudgetValues, } from "@/lib/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import NumberFormField from "@/components/forms/NumberFormField";
import CalenderFormField from "@/components/forms/CalenderFormField";
import TextFormField from "@/components/forms/TextFormField";
import {Button} from "@/components/ui/button";
import {createExpense} from "@/lib/actions/expense.actions";
import {showToast} from "@/lib/utils/toast";
import {useQueryClient} from "@tanstack/react-query";

const Form = ({id}: {id: string}) => {
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const form = useForm<expenseBudgetValues>({
        resolver: zodResolver(expenseBudgetSchema),
        defaultValues: {
            name: "",
            amount: 0,
            date: "",
        },
    })

    const onSubmit = async (data: expenseBudgetValues) => {
        setLoading(true);
        const fullData = {...data, category_name: id}
        try {
            await createExpense(fullData)
            form.reset()
            queryClient.invalidateQueries({queryKey: ["expenses"]})
            showToast({
                title: "Success!",
                description: "created expense successfully.",
                type: "success",
            });
        } catch (error: any) {
            console.error(error);
            showToast({
                title: "Error!",
                description: error.message || "Failed to create expense.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
            <p className="font-work-sans text-semibold text-lg md:text-2xl">Add Expense</p>
            <TextFormField label="Name" name="name" form={form} />
            <NumberFormField label="Amount" name="amount" form={form}/>
            <CalenderFormField label="Date" name="date" form={form}/>
            <Button>{ loading ? "Adding..." : "Add Expense"}</Button>
        </form>
    )
}
export default Form

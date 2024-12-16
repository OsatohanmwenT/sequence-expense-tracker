"use client"

import React from 'react'
import {useForm} from "react-hook-form";
import {ExpenseFormValues, expenseSchema} from "@/lib/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import NumberFormField from "@/components/forms/NumberFormField";
import CalenderFormField from "@/components/forms/CalenderFormField";
import TextFormField from "@/components/forms/TextFormField";
import {Button} from "@/components/ui/button";

const Form = () => {
    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            name: "",
            amount: 0,
            category_name: "",
            date: "",
        },
    })

    return (
        <form className="w-full flex flex-col gap-5">
            <p className="font-work-sans text-semibold text-lg md:text-2xl">Add Expense</p>
            <TextFormField label="Name" name="name" form={form} />
            <NumberFormField label="Amount" name="amount" form={form}/>
            <CalenderFormField label="Date" name="date" form={form}/>
            <Button>Add Expense</Button>
        </form>
    )
}
export default Form

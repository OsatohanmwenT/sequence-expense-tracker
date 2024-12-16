import * as z from "zod"
import {format} from "date-fns";

export const expenseSchema = z.object({
    name: z.string().min(1, "Name is required"),
    amount: z
        .number({message: "Must be a valid number"})
        .min(1, "must be greater than 0"),
    category_name: z.string(),
    date: z.date().transform((date) => format(date, "yyyy-MM-dd")),
})

export type ExpenseFormValues = z.infer<typeof expenseSchema>

export const expenseBudgetSchema = z.object({
    name: z.string().min(1, "Name is required"),
    amount: z
        .number({message: "Must be a valid number"})
        .min(1, "must be greater than 0"),
    date: z.date().transform((date) => format(date, "yyyy-MM-dd")),
})

export type expenseBudgetValues = z.infer<typeof expenseBudgetSchema>

export const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    description: z.string().min(1, "Description is required"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export const editCategoryBudgetSchema = z.object({
    amount_limit: z.number().min(1, "Amount is required"),
    start_date: z.date().transform((date) => format(date, "yyyy-MM-dd")),
    end_date: z.date().transform((date) => format(date, "yyyy-MM-dd"))
})

export type CategoryBudgetFormValues = z.infer<typeof editCategoryBudgetSchema>;

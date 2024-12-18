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

export const editBudgetSchema = z.object({
    amount_limit: z.number().min(1, "Amount is required"),
    start_date: z.date().transform((date) => format(date, "yyyy-MM-dd")),
    end_date: z.date().transform((date) => format(date, "yyyy-MM-dd"))
})

export type BudgetFormValues = z.infer<typeof editBudgetSchema>;

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const profileFormSchema = z.object({
    full_name: z
        .string()
        .min(2, {
            message: "full name must be at least 2 characters.",
        })
        .max(50, {
            message: "full name must not be longer than 50 characters.",
        }),
    phone_number: z.string().regex(phoneRegex, "Invalid phone number format"),
    bio: z.string().max(160).min(4),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

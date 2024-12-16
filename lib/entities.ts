import {ExpenseFormValues} from "@/lib/schemas";
import {FieldValues, useForm, UseFormReturn} from "react-hook-form";

export interface Expense {
    amount: number;
    name: string;
    id?: number;
    category_name: string;
    date: string;
    category_id?:  number;
}

export interface Category {
    name: string;
    description: string;
    id?: number;
}

export interface AnalyticsExpense {
    month: string;
    total: string;
}

export interface AnalyticsTrends {
    trends: AnalyticsExpense[];
}

export interface AnalyticsWeekly {
    week_start: string
    breakdown: ExpenseCategory[];
}

export interface ExpenseCategory {
    category_id: number;
    category_name: string;
    total: number;
}

export interface BudgetSummary {
    total_expenses: number;
    budget_limit: number;
    adherence: number | null;
    expenses_by_category: ExpenseCategory[];
}

export interface BudgetCategory {
    amount_limit: number,
    start_date: string,
    end_date: string,
    status: string,
    created_at: string,
    amount_used: number,
    category_name: string
}

export interface FormFieldProps<TFormValues extends FieldValues> {
    label: string;
    name: keyof TFormValues;
    form: UseFormReturn<TFormValues>;
}
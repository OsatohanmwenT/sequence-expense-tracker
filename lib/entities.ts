export interface Expense {
    amount: string;
    name: string;
    id?: number;
    category_name: string;
    date: string;
    category_id?:  number;
}


import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createExpense, fetchExpense, FetchExpenseType} from "@/lib/actions/expense.actions";
import {Expense} from "@/lib/entities";
import {showToast} from "@/lib/utils/toast";

export const useExpenses = (filters: FetchExpenseType) => useQuery({
    queryKey: ["expenses", filters],
    queryFn: () => fetchExpense({ ...filters }),
});

type PostExpenseContext = { previousExpenses: Expense[] };

export const usePostExpense = () => {
    const queryClient = useQueryClient();

    return useMutation<Expense, Error, Expense, PostExpenseContext>({
    // @ts-ignore
        mutationFn: createExpense,
        onMutate: async (newExpense: Expense) => {
            await queryClient.cancelQueries({ queryKey: ["expenses"] });

            const previousExpenses =
                queryClient.getQueryData<Expense[]>(["expenses"]) || [];

            queryClient.setQueryData<Expense[]>(["expenses"], (expenses = []) => [
                { ...newExpense, id: Math.random() }, // Temporary ID for optimistic updates
                ...expenses,
            ]);

            return { previousExpenses };
        },
        onSuccess: (createdExpense) => {
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] });

            // Show success toast
            showToast({
                title: "Success!",
                description: "Expense added successfully.",
                type: "success",
            });
        },
        onError: (error, _newExpense, context) => {
            if (context?.previousExpenses) {
                queryClient.setQueryData<Expense[]>(["expenses"], context.previousExpenses);
            }
            showToast({
                title: "Error!",
                description: error.message || "Failed to add expense. Please try again.",
                type: "error",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] });
        },
    });
};


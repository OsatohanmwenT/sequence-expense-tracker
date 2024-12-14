import {useQuery} from "@tanstack/react-query";
import {fetchAllBudgets} from "@/lib/actions/budget.actions";

export const useCategoryBudget = () => {
    return useQuery({
        queryKey: ["budgetCategory"],
        queryFn: () => fetchAllBudgets(),
        staleTime: 30000
    });
}
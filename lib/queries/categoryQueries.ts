import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {create, fetchCategory} from "@/lib/actions/category.actions";
import {Category} from "@/lib/entities";
import {showToast} from "@/lib/utils/toast";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategory()
    })
}

type PostCategoryContext = { previousCategory: Category[] };

export const usePostCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<Category, Error, Category, PostCategoryContext>({
        // @ts-ignore
        mutationFn: create,
        onMutate: async (newCategory: Category) => {
            await queryClient.cancelQueries({ queryKey: ["categories"] });

            const previousCategory =
                queryClient.getQueryData<Category[]>(["categories"]) || [];

            queryClient.setQueryData<Category[]>(["categories"], (category = []) => [
                { ...newCategory, id: Math.random() },
                ...category,
            ]);

            return { previousCategory };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })

            // Show success toast
            showToast({
                title: "Success!",
                description: "New Category added successfully.",
                type: "success",
            });
        },
        onError: (error, _newCategory, context) => {
            if (context?.previousCategory) {
                queryClient.setQueryData<Category[]>(["categories"], context.previousCategory);
            }
            showToast({
                title: "Error!",
                description: error.message || "Failed to add category. Please try again.",
                type: "error",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};
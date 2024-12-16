import React from 'react'
import CategoryCardSkeleton from "@/components/skeletons/CategoryCardSkeleton";
import {useCategoryBudget} from "@/lib/queries/budgetQueries";
import BudgetCard from "@/components/Card/BudgetCard";
import {fetchAllBudgets} from "@/lib/actions/budget.actions";
import Link from "next/link";

const CategoryOverview = async () => {
    const categories = await fetchAllBudgets()
    const isLoading = false

    return (
        <section className="mt-10">
                <div className="category_container">
                    {categories?.map(category => (
                        <Link key={category.category_name} className="sm:hover:shadow-xl max-sm:active:shadow-xl h-fit transition-all rounded-lg"
                              href={`/budget/category_budget/${category.category_name}`}>
                            <BudgetCard {...category} />
                        </Link>
                    ))}
                </div>
        </section>
    )
}
export default CategoryOverview

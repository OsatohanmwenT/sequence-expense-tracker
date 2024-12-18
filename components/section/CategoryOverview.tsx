import React from 'react'
import CategoryCardSkeleton from "@/components/skeletons/CategoryCardSkeleton";
import {useCategoryBudget} from "@/lib/queries/budgetQueries";
import BudgetCard from "@/components/Card/BudgetCard";
import {fetchAllBudgets} from "@/lib/actions/budget.actions";
import Link from "next/link";
import {BudgetCategory} from "@/lib/entities";

interface Props {
    categories: BudgetCategory[]
}

const CategoryOverview = async () => {
    const categories = await fetchAllBudgets()

    if (!categories) {
        return <p className="text-red-500 text-3xl">NO BUDGET FOUND</p>
    }

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

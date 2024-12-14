"use client"

import React from 'react'
import CategoryCardSkeleton from "@/components/skeletons/CategoryCardSkeleton";
import {useCategoryBudget} from "@/lib/queries/budgetQueries";
import BudgetCard from "@/components/BudgetCard";

const CategoryOverview = () => {
    const { data: categories, isLoading } = useCategoryBudget()

    return (
        <section className="mt-10">
            {isLoading ? (
                <CategoryCardSkeleton/>
            ) : (
                <div className="category_container">
                    {categories?.map(category => (
                        <BudgetCard key={category.category_name} {...category} />
                    ))}
                </div>
            )}
        </section>
    )
}
export default CategoryOverview

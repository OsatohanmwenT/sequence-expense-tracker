import React from 'react'
import CategoryOverview from "@/components/section/CategoryOverview";
import AddCategory from "@/components/Buttons/AddCategory";

const Page = async () => {
    return (
        <div className="p-5">
            <section className="flex-between">
                <h1 className="text-4xl font-inter font-semibold">My Budgets</h1>
                <div className="max-w-[200px]">
                    <AddCategory type="Add Category" />
                </div>
            </section>
            <CategoryOverview />
        </div>
    )
}
export default Page

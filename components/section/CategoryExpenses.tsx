"use client"

import React, {useState} from 'react'
import ExpenseList from "@/components/Lists/ExpenseList";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useExpenses} from "@/lib/queries/expenseQueries";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import {useQueryClient} from "@tanstack/react-query";

const CategoryExpenses = ({id}: {id: string}) => {
    const [url, setUrl] = useState<string|null>(null)
    const [limit, setLimit] = React.useState<number|undefined>(undefined)
    const queryClient = useQueryClient();
    const { data: expenses, isLoading } = useExpenses({ limit: limit || 10, category_name: id }, url);
    console.log(expenses);

    const handleLimitChange = (value: string) => {
        setLimit(Number(value));
        setUrl(null);
        queryClient.resetQueries({ queryKey: ["expenses"] })
    }

    const handlePageChange = (pageLink: string | undefined | null) => {
        if (!pageLink) return;
        setUrl(pageLink);
    }

    return (
        <>
            <div className="xl:col-span-2 border-2 rounded-lg">
                <div>
                    {isLoading ? ((<TableSkeleton />)) : <ExpenseList expenses={expenses?.expenses} />}
                </div>
                <div className="h-12 px-2 flex-between border-t-[1px]">
                    <div className="flex items-center gap-2">
                        <span>Results Per Page:</span>
                            <Select onValueChange={handleLimitChange}>
                            <SelectTrigger className="w-[60px]">
                                <SelectValue className="font-work-sans" />
                            </SelectTrigger>
                            <SelectContent className="font-work-sans">
                                <SelectGroup>
                                    <SelectLabel>Results</SelectLabel>
                                    {[5, 10, 15, 20].map((value) => (
                                        <SelectItem key={value} value={value.toString()}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Button onClick={() => handlePageChange(expenses?.prev_page)} disabled={expenses?.current_page === 1} variant="outline" className="flex hover:bg-neutral-400 items-center p-2">
                            <ArrowLeft className="size-5"/>
                        </Button>
                        <div className="flex items-center gap-2">
                            <span className="py-1 max-xs:hidden bg-black text-white px-3 rounded-lg shadow border-[1px]">{expenses?.current_page}</span>
                        </div>
                        <Button onClick={() => handlePageChange(expenses?.next_page)} disabled={expenses?.current_page === expenses?.total_pages} variant="outline" className="flex hover:bg-neutral-400 items-center p-2">
                            <ArrowRight className="size-5"/>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CategoryExpenses

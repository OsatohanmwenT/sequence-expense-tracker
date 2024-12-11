import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useEffect, useState} from "react";
import {Category} from "@/lib/entities";
import {fetchCategory} from "@/lib/actions/category.actions";

interface Props {
    setFilterBy: (filterName: string) => void;
}

export default function SortSelect({ setFilterBy }: Props) {
    const [categories, setCategories] = useState<Category[] | undefined>([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetchCategory()
                console.log(data)
                setCategories(data)
            } catch (error: any) {
                console.error(error.detail)
            }
        }
        fetchCategories()
    },[])

    const handleValueChange = (value: string) => {
        console.log(value)
        setFilterBy(value)
    };

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[120px]">
                <SelectValue className="font-work-sans" placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent className="font-work-sans">
                <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories?.map((category) => (
                        <SelectItem value={category.name} key={category.id}>{category.name}</SelectItem>
                    ))}
                    <button className="w-full py-1 px-2 text-start">Other</button>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

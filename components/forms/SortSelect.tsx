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
import useCategories from "@/app/hooks/useCategories";

interface Props {
    setFilterBy: (filterName: string) => void;
}

export default function SortSelect({ setFilterBy }: Props) {
    const categories = useCategories();

    const handleValueChange = (value: string) => {
        setFilterBy(value === "all" ? "" : value)
    };

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[120px]">
                <SelectValue className="font-work-sans" placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent className="font-work-sans">
                <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    {categories?.map((category) => (
                        <SelectItem value={category.name} key={category.id}>{category.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

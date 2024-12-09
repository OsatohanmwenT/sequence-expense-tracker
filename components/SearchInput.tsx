import React from 'react'
import { Search } from "lucide-react";

const SearchInput = () => {
    return (
        <div className="flex max-md:hidden px-2 items-center rounded-md border-2">
            <Search className="size-5" />
            <input className="px-2 py-2 md:w-[300px] bg-transparent focus:outline-none" type="text" placeholder="Search" />
        </div>
    )
}
export default SearchInput

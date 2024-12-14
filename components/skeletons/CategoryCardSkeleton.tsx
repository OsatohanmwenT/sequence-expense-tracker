import React from 'react'
import {Skeleton} from "@/components/ui/skeleton";

const CategoryCardSkeleton = () => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map((category) => (
                <Skeleton key={category} className="h-[150px]"/>
            ))}
        </div>
    )
}
export default CategoryCardSkeleton

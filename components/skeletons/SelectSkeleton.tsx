import { Skeleton } from "@/components/ui/skeleton"

export default function SelectSkeleton() {
    return (
        <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-[100px]" />
        </div>
    )
}

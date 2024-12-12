import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function TableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Amount</TableHead>
                    <TableHead className="max-sm:hidden">Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="max-sm:hidden">Date Added</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell className="max-sm:hidden">
                            <div className="flex items-center">
                                <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-40" />
                        </TableCell>
                        <TableCell className="max-sm:hidden">
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell className="text-right max-sm:hidden">
                            <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}


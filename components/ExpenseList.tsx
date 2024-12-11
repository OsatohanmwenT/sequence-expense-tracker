import { MoreHorizontal, Receipt, ShoppingCart } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Expense} from "@/lib/entities";

interface Props {
    expenses: Expense[] | undefined;
    handleDeleteExpense: (id: number | undefined) => void;
}

export default function ExpenseList({ expenses, handleDeleteExpense }: Props) {

    return (
        <Table className="border-t-[1px]">
            <TableHeader>
                <TableRow className="font-work-sans text-light-green-200">
                    <TableHead className="w-[100px]">Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="font-work-sans">
                {expenses?.map((expense) => (
                    <TableRow key={expense.id}>
                        <TableCell className="font-medium">€ {expense.amount}</TableCell>
                        <TableCell>
                            <div className="flex items-center">
                                {expense.category_name === "Debt" ? (
                                    <Receipt className="mr-2 h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                {expense.category_name}
                            </div>
                        </TableCell>
                        <TableCell>{expense.name}</TableCell>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="font-work-sans shadow-xl" align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>View details</DropdownMenuItem>
                                    <DropdownMenuItem>Edit expense</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="hover:bg-red-600 hover:text-white" onClick={() => handleDeleteExpense(expense.id)}>Delete expense</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}


"use client"

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
import {formatNumber} from "@/lib/utils";
import AddButton from "@/components/Buttons/AddButton";
import {deleteExpense} from "@/lib/actions/expense.actions";
import {showToast} from "@/lib/utils/toast";
import {useQueryClient} from "@tanstack/react-query";

interface Props {
    expenses: Expense[] | undefined;
}

export default function ExpenseList({ expenses }: Props) {
    const queryClient = useQueryClient();
    const handleDeleteExpense = async (id: number | undefined) => {
        if (!id) return
        try {
            const response = await deleteExpense(id);
            if (!response) {
                showToast({
                    title: "Error!",
                    description: "Failed to delete the expense. Please try again.",
                    type: "error",
                });
                return;
            }

            queryClient.resetQueries({ queryKey: ["expenses"] })

            showToast({
                title: "Success!",
                description: "Expense deleted successfully.",
                type: "success",
            });
        } catch (error) {
            console.error(error);
            showToast({
                title: "Error!",
                description: "An unexpected error occurred.",
                type: "error",
            });
        }
    }
    return (
        <div className="relative">
            <Table className="border-t-[1px] max-h-[250px] overflow-scroll">
                <TableHeader>
                    <TableRow className="font-work-sans text-light-green-200">
                        <TableHead className="w-[110px] lg:w-[150px]">Amount</TableHead>
                        <TableHead className="w-[110px] lg:w-[150px] max-sm:hidden">Category</TableHead>
                        <TableHead className="w-[150px] lg:w-[200px]">Expense name</TableHead>
                        <TableHead className="max-sm:hidden">Date Added</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <div className="overflow-y-auto list_scroll">
                <Table>
                    <TableBody className="font-work-sans">
                        {expenses === undefined &&
                            (<TableRow className="text-2xl text-center">
                                <TableCell colSpan={5} className="text-red-500">
                                    <p>No Expense Found</p>
                                    <AddButton type="no" />
                                </TableCell>
                            </TableRow>)}
                            {expenses?.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell className="w-[110px] lg:w-[150px] font-medium">€ {formatNumber(expense.amount)}</TableCell>
                                    <TableCell className="w-[110px] lg:w-[150px] max-sm:hidden">
                                        <div className="flex items-center">
                                            {expense.category_name === "Debt" ? (
                                                <Receipt className="mr-2 h-4 w-4 text-muted-foreground"/>
                                            ) : (
                                                <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground"/>
                                            )}
                                            {expense.category_name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-[150px] lg:w-[200px]">{expense.name}</TableCell>
                                    <TableCell className="max-sm:hidden">{expense.date}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="font-work-sans shadow-xl" align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View details</DropdownMenuItem>
                                                <DropdownMenuItem>Edit expense</DropdownMenuItem>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem className="hover:bg-red-600 hover:text-white"
                                                                  onClick={() => handleDeleteExpense(expense.id)}>Delete
                                                    expense</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
)
}


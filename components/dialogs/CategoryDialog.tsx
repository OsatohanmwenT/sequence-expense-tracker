"use client"

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {CategoryFormValues, categorySchema} from "@/lib/schemas";
import {usePostCategory} from "@/lib/queries/categoryQueries";
import {usePathname} from "next/navigation";

interface AddCategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CategoryDialog({ open, onOpenChange }: AddCategoryDialogProps) {
    const { mutate: createCategory } = usePostCategory();
    const path = usePathname()
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = (data: CategoryFormValues) => {
        onOpenChange(false);
        createCategory({ category: {...data}, path }, {
            onSuccess: () => form.reset()
        });
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>
                        Create a new category for your expenses.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="name">
                                Name
                            </Label>
                            <div className="col-span-3">
                                <Input id="name" {...form.register("name")} />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="description">
                                Description
                            </Label>
                            <div className="col-span-3">
                                <Input id="description" {...form.register("description")} />
                                {form.formState.errors.description && (
                                    <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Category</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}


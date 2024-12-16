"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import {deleteCategory} from "@/lib/actions/category.actions";
import {showToast} from "@/lib/utils/toast";
import {useRouter} from "next/navigation";

const DeleteCategory = ({ category_name }: { category_name: string }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async (name: string) => {
        try {
            const response = await deleteCategory(name)
            if (response.status === 200) {
                showToast({
                    title: "Success",
                    description: `Successfully deleted`,
                    type: "success",
                })
            }
            router.push("..");
        }  catch (error) {
            showToast({
                title: "Error",
                description: `Error while deleting category`,
                type: "error",
            })
        }
        setIsDeleteDialogOpen(false);
    }

    return (
        <>
            <Button
                onClick={() => setIsDeleteDialogOpen(true)}
                className="bg-white hover:bg-red-500 hover:text-white text-black"
            >
                Delete
            </Button>

            <DeleteDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onDelete={() => handleDelete(category_name)}
            />
        </>
    );
}

export default DeleteCategory;

"use client"

import React, {useState} from 'react'
import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import CategoryDialog from "@/components/dialogs/CategoryDialog";

type TypeButton = "Other" | "Add Category";

const AddCategory = ({type}: {type: TypeButton}) => {
    const [addCategoryOpen, setAddCategoryOpen] = useState(false);
    
    return (
        <>
            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setAddCategoryOpen(true)}
            >
                <PlusCircle className="h-4 w-4 mr-2" />
                {type === "Add Category" ? "Add Category" : "Other"}
            </Button>
            <CategoryDialog
                open={addCategoryOpen}
                onOpenChange={setAddCategoryOpen}
            />
        </>
    )
}
export default AddCategory

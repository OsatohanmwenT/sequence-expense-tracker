import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: () => void;
}

const DeleteDialog = ({ open, onOpenChange, onDelete }: DeleteDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to permanently
                        delete this file from our servers?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={() => {
                        onDelete();
                        onOpenChange(false);
                    }} className="bg-red-500 hover:bg-red-600 text-white">Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteDialog

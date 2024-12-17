"use client"

import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import {deleteUserAccount} from "@/lib/actions/user.action";
import {logoutUser} from "@/lib/auth/actions";
import {showToast} from "@/lib/utils/toast";
import {LoaderCircle} from "lucide-react";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const deleteAccount = async () => {
        setIsLoading(true);
        try{
            await deleteUserAccount()
            await logoutUser()
        } catch (error: any) {
            console.log(error)
            showToast({
                title: "Error!",
                description: error.message || "Failed to update profile.",
                type: "error",
            });
        }finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center h-[500px] justify-center">
                <LoaderCircle className="animate-spin size-20" />
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-3 tracking-tight">Account</h1>
            <p className="text-muted-foreground mb-3">Are you sure you want to delete your account permanantly this?</p>
            <Button className="hover:bg-red-500" onClick={deleteAccount}>Delete</Button>
        </div>
    )
}
export default Page

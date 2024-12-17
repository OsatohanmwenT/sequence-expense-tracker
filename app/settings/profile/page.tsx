"use client"

import React, {useState} from 'react'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {profileFormSchema, ProfileFormValues} from "@/lib/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateUserProfile} from "@/lib/actions/user.action";
import {showToast} from "@/lib/utils/toast";
import {LoaderCircle} from "lucide-react";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            full_name: "",
            phone_number: "",
            bio: ""
        }
    });

    const onSumbit = async (data: ProfileFormValues) => {
        setIsLoading(true);
        try {
            await updateUserProfile(data)
            showToast({
                title: "Success!",
                description: "Profile updated successfully.",
                type: "success",
            });
            form.reset()
        } catch (error: any) {
            console.log(error)
            showToast({
                title: "Error!",
                description: error.message || "Failed to update profile.",
                type: "error",
            });
        } finally {
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
        <>
            <div>
                <h2 className="text-2xl font-semibold tracking-tight">Profile</h2>
                <p className="text-muted-foreground">
                    Update your account settings. Set your phone number and bio.
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-8">
                <div className="space-y-2">
                    <label htmlFor="full_name" className="text-sm font-medium">
                        Full name
                    </label>
                    <Input
                        placeholder="Your name"
                        className="max-w-lg"
                        {...form.register("full_name")}
                    />
                    <p className="text-sm text-muted-foreground">
                        This is the name that will be displayed on your profile and in emails.
                    </p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="phone_number" className="text-sm font-medium">
                        Phone number
                    </label>
                    <Input
                        placeholder="+1 (555) 123-4567"
                        className="max-w-lg"
                        {...form.register("phone_number")}
                    />
                    <p className="text-sm text-muted-foreground">
                        Your phone number is used to contact you.
                    </p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">
                        Bio
                    </label>
                   <Input
                       placeholder="Your bio"
                       className="max-w-lg"
                       {...form.register("bio")}
                   />
                    <p className="text-sm text-muted-foreground">
                        This is for more info about users.
                    </p>
                </div>
                <Button type="submit" className="min-w-[200px]">
                    Update account
                </Button>
            </form>
        </>
    )
}
export default Page

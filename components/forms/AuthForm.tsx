"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Loader} from "lucide-react";
import Link from "next/link";
import {authFormSchema} from "@/lib/validate";
import {loginUser, registerUser} from "@/lib/auth/actions";
import Image from "next/image";
import {showToast} from "@/lib/utils/toast";
import {redirect} from "next/navigation";

export type FormType = "sign-in" | "sign-up"

const AuthForm = ({ type }: {type: FormType}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setErrorMessage("")
        try{
             const result = type === "sign-up"
                ? await registerUser(values)
                : await loginUser({ email: values.email, password: values.password })

            if (!result?.success) {
                setErrorMessage(result?.message)
                showToast({
                    title: "Error!",
                    description: result?.message,
                    type: "error",
                })
            } else {
                console.log(result.message)
                showToast({
                    title: "Success!",
                    description: result.message,
                    type: "success",
                })
            }
            if (result?.success && type === "sign-up") {
                setTimeout(() => redirect("/sign-in"), 2000)
            }
        } catch (error: any) {
            setErrorMessage("An unexpected error occurred. Please try again.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const response = await fetch("https://expense-tracker-api-production-3dfe.up.railway.app/auth/login/google",{
                method: "GET",
            })
            if(!response.ok) {
                throw new Error("Could not login with Google");
            }
            if (response && response.url) {
                const url = await response.json();
                window.location.href = url.url;
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                    <h1 className="text-center font-bold font-work-sans text-neutral-800 text-4xl">{type === "sign-in" ? "Sign In" : "Sign Up"}</h1>
                    {type === "sign-up" && (
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input className="shadow font-helvetica" placeholder="username" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input className="shadow font-inter" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shadow font-helvetica"
                                           placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {errorMessage && (
                        <div className="flex justify-center">
                            <p className="text-red-500 text-lg">
                                {errorMessage}
                            </p>
                        </div>
                    )}
                    <Button disabled={isLoading} className="form-button" type="submit">
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                        {isLoading && (<Loader className="animate-spin"/>)}
                    </Button>
                    <div className="flex justify-center">
                        <p className="font-helvetica text-neutral-600">
                            {type === "sign-in"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                              className="ml-1 font-helvetica font-medium text-green">
                            {type === "sign-in" ? "Sign Up" : "Sign In"}
                        </Link>
                    </div>
                </form>
            </Form>
            <div className="flex items-center mt-5 gap-2">
                <hr className="h-[1px] w-full bg-neutral-300"/>
                <p className="font-inter text-xs text-green-300 text-nowrap">OR CONTINUE WITH</p>
                <hr className="h-[1px] w-full bg-neutral-300"/>
            </div>
            <button className="border-[1px] flex items-center mt-5 justify-center w-full gap-2 hover:shadow-xl transition-all py-1 rounded-md" onClick={handleGoogleLogin}>
                <Image src="/google_icon.svg" alt="google icon" width={30} height={30} />
                <p className="font-medium">GOOGLE</p>
            </button>
        </>
    )
}
export default AuthForm

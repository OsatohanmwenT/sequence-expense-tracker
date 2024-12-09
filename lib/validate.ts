import {z} from "zod";
import {FormType} from "@/components/AuthForm";

export const authFormSchema = (formType: FormType) => {
    return z.object({
        username: formType === "sign-up" ? z.string().min(3, {
            message: "Username must be at least 3 characters.",
        }) : z.string().optional(),
        email: z.string().email({message: "Invalid email address."}),
        password: z.string()
            .min(8, { message: "Password should be at least 8 characters long." })
            .refine((value) => /[A-Z]/.test(value), {
                message: "Password must contain at least one uppercase letter.",
            })
            .refine((value) => /[a-z]/.test(value), {
                message: "Password must contain at least one lowercase letter.",
            })
            .refine((value) => /[0-9]/.test(value), {
                message: "Password must contain at least one number.",
            })
            .refine((value) => /[#?!@$%^&*-]/.test(value), {
                message: "Password must contain at least one special character (#?!@$%^&*-).",
            }),
    })
}
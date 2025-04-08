import { z } from "zod";

export const SignupSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
    role: z.enum(["USER", "HOST"])
});

export const LoginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});


export const phoneNumberSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
})



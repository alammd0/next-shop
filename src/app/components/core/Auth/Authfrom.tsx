'use client'

import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "@/app/services/opreations/authApi";
import { redirect } from "next/navigation";
import { SignupSchema, LoginSchema } from "@/app/lib/zod/auth";
import { signIn } from "next-auth/react";
import { ControllerRenderProps } from "react-hook-form";
import Link from "next/link";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { SkeletonDemo } from "../../common/SkeletonCard";
import toast from "react-hot-toast";

interface AuthProps {
    type: "login" | "signup"
}

type AuthFormData = {
    email: string;
    password: string;
    // other properties
};

type authFromData = z.infer<typeof SignupSchema> | z.infer<typeof LoginSchema>;
type SignupData = z.infer<typeof SignupSchema>;
type LoginData = z.infer<typeof LoginSchema>;



export const Authfrom = ({ type }: AuthProps) => {
    const authFrom = type

    const form = useForm<authFromData>({
        resolver: zodResolver(type === "signup" ? SignupSchema : LoginSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "USER",
            password: ""
        },
    });

    const [loading, Setloading] = useState(false);


    // const router = useRouter();

    const onSubmit = async (data: SignupData | LoginData) => {
        console.log("Submitting...", data);
        Setloading(true);

        if (type === "signup") {
            const { name, email, role, password } = data as SignupData;
            const res = await signup({ name, email, role, password });
            if (res?.error) {
                console.log(res.error);
                toast.error("User Already Exits")
            }
            Setloading(false);
            toast.success("User Login Seccesfully")
            redirect("/auth/login");
        } else {
            const { email, password } = data as LoginData;
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                console.log("Login failed:", res.error);
                toast.error("Login Failed")
            } else {
                redirect("/");
            }
            Setloading(false)
            toast.success("User Login seccesfully");
            console.log("Login successful");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center text-white text-xl">
                <SkeletonDemo />
            </div>
        );
    }

    return (
        <div className="flex justify-center flex-col">

            <div className="text-slate-50 pb-4">
                {
                    authFrom === "signup" ? (
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold">Create Your Shopping Account</h1>
                            <p className="text-md">Join thousands of shoppers and enjoy a seamless shopping experience</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold">Login Your Shopping Account</h1>
                            <p className="text-md">Thanks for being a valued shopper</p>
                        </div>
                    )
                }
            </div>

            <div>
                <Form {...form}>
                    <form className="flex flex-col gap-2 text-slate-300" onSubmit={form.handleSubmit(onSubmit)}>

                        {
                            type === "signup" && (
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Account Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-slate-700 text-slate-50">
                                                    <SelectItem value="USER">User</SelectItem>
                                                    <SelectItem value="HOST">Host</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        }

                        {
                            type === "signup" && (
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name : </FormLabel>
                                                <FormControl>
                                                    <Input className="text-slate-50 text-shadow-md" placeholder="Enter your name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )
                        }

                        <div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email : </FormLabel>
                                        <FormControl>
                                            <Input className="text-slate-50 text-shadow-md" placeholder="Email is required" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }: { field: ControllerRenderProps<AuthFormData, "password"> }) => (
                                    <FormItem>
                                        <FormLabel>Password :</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>


                        <Button
                            className="w-full mt-4 bg-slate-800 text-slate-50 hover:bg-slate-700"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Please wait..." : type === "signup" ? "Signup" : "Login"}
                        </Button>

                    </form>
                </Form>

                <div className="flex justify-between gap-2 items-center mt-4">
                    <Link href={`/auth/${type === "signup" ? "login" : "signup"}`} className="text-sm text-slate-50 hover:underline">
                        {
                            type === "signup" ? (
                                "Already have an account ?"
                            ) : (
                                "Don't have an account ?"
                            )
                        }
                    </Link>
                    <Link href={`/auth/${type === "signup" ? "phone-signup" : "reset-password"}`} className="text-sm text-slate-50 hover:underline">{
                        type === "signup" ? (
                            "Create Account Using Phone Number ? "
                        ) : (
                            "Reset Password"
                        )
                    }</Link>
                </div>

            </div>

        </div>
    );
};
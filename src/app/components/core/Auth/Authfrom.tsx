'use client'

import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, signup } from "@/app/services/opreations/authApi";
// import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { SignupSchema, LoginSchema } from "@/app/lib/zod/auth";
import { signIn } from "next-auth/react";

interface AuthProps {
    type: "login" | "signup"
}

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
            phoneNumber: "",
            password: ""
        },
    });


    // const router = useRouter();

    const onSubmit = async (data: SignupData | LoginData) => {
        console.log("Submitting...", data);

        if (type === "signup") {
            const { name, email, phoneNumber, password } = data as SignupData;
            const res = await signup({ name, email, phoneNumber, password });
            if (res?.error) {
                console.log(res.error);
            }
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
            } else {
                redirect("/");
            }

            console.log("Login successful");
        }
    };

    return (
        <div>
            <div>
                {
                    authFrom === "signup" ? (
                        <div>
                            <h1>Create Your Shopping Account</h1>
                            <p>Join thousands of shoppers and enjoy a seamless shopping experience</p>
                        </div>
                    ) : (
                        <div>
                            <h1>Login Your Shopping Account</h1>
                            <p>Thanks for being a valued shopper</p>
                        </div>
                    )
                }
            </div>

            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

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
                                                    <Input placeholder="Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
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
                                            <Input placeholder="Email is required" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        <FormDescription>
                                            <span>
                                                {type === "signup"
                                                    ? "Please Enter Unique Email"
                                                    : "Please Enter Registered Email"}
                                            </span>
                                        </FormDescription>

                                    </FormItem>
                                )}
                            />
                        </div>

                        {
                            type === "signup" && (
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number : </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Phone Number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                <FormDescription>
                                                    Enter Phone Number
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )
                        }

                        <div>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password : </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        <FormDescription>
                                            <span>
                                                {
                                                    type === "signup" ? (
                                                        "Create Unique password"
                                                    ) : (
                                                        " Please Enter Registered Password"
                                                    )
                                                }
                                            </span>
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit">
                            {
                                type === "signup" ? (
                                    "Signup"
                                ) : (
                                    "Login"
                                )
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
'use client'

import { z } from "zod";
import { phoneNumberSchema } from "@/app/lib/zod/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SkeletonDemo } from "../../common/SkeletonCard";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sendOtp } from "@/app/services/opreations/authApi";
import Otp from "./OtpInput";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast"
import { redirect } from "next/navigation";

type LoginInput = {
    name: string,
    phoneNumber: string,
    otp: string
}

type PhoneNumberData = z.infer<typeof phoneNumberSchema>

export const PhoneLogin = () => {

    const formData = useForm<PhoneNumberData>({
        resolver: zodResolver(phoneNumberSchema),
        defaultValues: {
            name: "",
            phoneNumber: ""
        }
    });

    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);


    async function sendOtpHandler(data: PhoneNumberData) {
        setLoading(true);
        try {
            if (!data.phoneNumber) {
                toast.error("Phone number is required");
                return;
            }

            console.log("Sending OTP to:", data.phoneNumber);

            const response = await sendOtp({ phoneNumber: data.phoneNumber, name: data.name });
            console.log("OTP sent response:", response);
            toast.success("OTP sent successfully");
            setOtpSent(true);
        } catch (error: any) {
            console.error("OTP Send Error:", error);
            toast.error("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    }


    async function onSubmit(data: PhoneNumberData) {
        console.log(data);

        const { name, phoneNumber } = data;

        const usingPhone = await signIn("credentials", {
            redirect: false,
            name,
            phoneNumber
        });

        if (usingPhone?.error) {
            console.log("Login failed:", usingPhone.error);
            toast.error("Login Failed")
        } else {
            redirect("/");
        }
        setLoading(false)
        toast.success("User Login seccesfully");
        console.log("Login successful");

    }



    if (loading) {
        return (
            <div className="flex items-center justify-center text-white text-xl">
                <SkeletonDemo />
            </div>
        );
    }
    else {
        return (
            <div className="flex justify-center flex-col">
                <div className="text-slate-50 pb-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Login Your Shopping Account</h1>
                        <p className="text-md">Thanks for being a valued shopper</p>
                    </div>

                    <Form {...formData}>
                        <form onSubmit={formData.handleSubmit(onSubmit)} className="flex flex-col gap-2 text-slate-300">
                            <FormField
                                control={formData.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name : </FormLabel>
                                        <FormControl>
                                            <Input className="text-slate-50 text-shadow-md" placeholder="Your Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formData.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number : </FormLabel>
                                        <FormControl>
                                            <Input className="text-slate-50 text-shadow-md" placeholder="Phone Number Required" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                className="w-full mt-4 bg-slate-800 text-slate-50 hover:bg-slate-700"
                                disabled={loading || !formData.watch("phoneNumber")}
                                onClick={() => sendOtpHandler(formData.getValues())}
                            >
                                {loading ? "Sending..." : "Send OTP"}
                            </Button>


                            {
                                otpSent && (
                                    <div>
                                        <Otp />
                                        <Button className="w-full mt-4 bg-slate-800 text-slate-50 hover:bg-slate-700"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            Login
                                        </Button>
                                    </div>
                                )
                            }
                        </form>
                    </Form>

                    <div className="flex justify-center item-center gap-2 items-center mt-4">
                        <Link href="/auth/login}" className="text-sm text-slate-50 hover:underline">
                            Already have an account ?
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
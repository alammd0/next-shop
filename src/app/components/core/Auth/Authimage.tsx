"use client";

import Image from "next/image";
import Login from "../../../../../public/auth/Login.jpg";
import Signup from "../../../../../public/auth/Signup.jpg";

interface AuthimageProps {
    type: "login" | "signup";
}

export const Authimage = ({ type }: AuthimageProps) => {
    return (
        <div>
            {type === "signup" ? (
                <Image
                    src={Signup}
                    alt="Signup Illustration"
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover"
                />
            ) : (
                <Image
                    src={Login}
                    alt="Login Illustration"
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover"
                />
            )}
        </div>
    );
};

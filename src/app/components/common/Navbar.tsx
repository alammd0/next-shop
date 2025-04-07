"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, ShoppingCart, User } from "lucide-react"

const navItems = [
    {
        id: 1,
        name: "Home",
        path: "/"
    },
    {
        id: 2,
        name: "All Products",
        path: "/all-products"
    },
    {
        id: 3,
        name: "Men",
        path: "/products/men"
    },
    {
        id: 4,
        name: "Women",
        path: "/products/women"
    }
]


export default function Navbar() {

    const { data: session } = useSession();

    return (
        <div className="bg-[#d9d9d9] h-[60px]">
            <div className="max-w-[1280px]  mx-auto flex justify-between items-center px-4 py-2">

                <div className="flex gap-6 items-center justify-center">

                    <div className="text-2xl font-bold hover:cursor-pointer">
                        <Link href={"/"}>
                            NextShop
                        </Link>
                    </div>

                    <div className="flex gap-6  items-center justify-center">
                        {
                            navItems.map((item: any) => (
                                <div key={item.id} className="hover:text-gray-800 hover:cursor-pointer font-medium text-center text-[17px]">
                                    <Link href={item.path}>
                                        {item.name}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className="flex gap-6 items-center">

                    <div>
                        <Link href="/cart" className="flex items-center gap-1 hover:text-black">
                            <ShoppingCart className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        {
                            session ? (
                                <div className="flex items-center gap-5">
                                    <div>
                                        <Link href={"/profile"}>
                                            <User className="w-5 h-5" />
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-center cursor-pointer">
                                        <button className="cursor-pointer" onClick={() => signOut()}>
                                            <LogOut className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                            ) : (
                                <div className="flex gap-5">
                                    <Link href={"/auth/login"}>
                                        <Button variant="outline">Login</Button>
                                    </Link>
                                    <Link href={"/auth/signup"}>
                                        <Button variant="outline">Signup</Button>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
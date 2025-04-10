"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, ShoppingCart, User } from "lucide-react"

export const navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "All Products", path: "/all-products" },
    { id: 3, name: "Men", path: "/products/men" },
    { id: 4, name: "Women", path: "/products/women" },
]

interface User {
    user: any
}


export default function Navbar() {
    const { data: session } = useSession()
    // console.log(session);
    const user = session?.user;


    return (
        <div className="bg-[#d9d9d9] h-[60px]">
            <div className="max-w-[1280px] mx-auto flex justify-between items-center px-4 py-2">

                {/* Left Side */}
                <div className="flex gap-6 items-center">
                    <div className="text-2xl font-bold hover:cursor-pointer">
                        <Link href="/">NextShop</Link>
                    </div>

                    <div className="flex gap-6 items-center">
                        {navItems.map(item => (
                            <div key={item.id} className="hover:text-gray-800 font-medium text-[17px]">
                                <Link href={item.path}>{item.name}</Link>
                            </div>
                        ))}
                        
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex gap-6 items-center">
                    <Link href="/cart" className="hover:text-black">
                        <ShoppingCart className="w-5 h-5" />
                    </Link>

                    <div className="flex items-center gap-5">
                        {user ? (
                            <>
                                <Link href="/profile">
                                    <User className="w-5 h-5" />
                                </Link>
                                <button onClick={() => signOut()} aria-label="Sign Out">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link href="/auth/signup">
                                    <Button variant="outline">Signup</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

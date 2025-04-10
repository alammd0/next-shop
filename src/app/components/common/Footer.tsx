import { navItems } from "./Navbar";
import Link from "next/link";

export const quiqLink = [
    {
        id: 1,
        name: "Home",
        link: "/home"
    },
    {
        id: 2,
        name: "About",
        link: "/home"
    },
    {
        id: 3,
        name: "Contact US",
        link: "/home"
    },
    {
        id: 4,
        name: "More Link",
        link: "morelink"
    }
]


export default function Footer() {
    return (
        <div className="bg-slate-500 px-14 py-12">
            <div className="max-w-[1220px] mx-auto">
                <div className="flex justify-between items-start">
                    <div className="text-2xl font-bold hover:cursor-pointer">
                        <Link href="/">NextShop</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-bold hover:cursor-pointer">Shop Highlights</h1>
                        <div className="flex flex-col gap-6">
                            {navItems.map(item => (
                                <div key={item.id} className="hover:text-gray-800 font-medium text-[17px]">
                                    <Link href={item.path}>{item.name}</Link>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="text-xl font-bold hover:cursor-pointer">
                            Quick Links
                        </div>

                        <div className="flex flex-col gap-6">
                            {quiqLink.map(item => (
                                <div key={item.id} className="hover:text-gray-800 font-medium text-[17px]">
                                    <Link href={item.link}>{item.name}</Link>
                                </div>
                            ))}

                        </div>

                    </div>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-bold hover:cursor-pointer">Store Details</h1>
                        <div className="max-w-[80%] flex flex-col gap-4">
                            <p className=" text-sm font-semibold
                            ">Address: 502 New Design Str, Melbourne, Australia</p>
                            <p className=" text-sm font-semibold
                            ">Email : mdkhalidalam001@gmail.com</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
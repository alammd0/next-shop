"use client"


import { useSession } from "next-auth/react"
import Link from "next/link";
import HostDashboard from "../components/core/Host/HostDashboard";
import Footer from "../components/common/Footer";

export default function Home() {

    const { data: session } = useSession()
    console.log(session);
    const user = session?.user as { role: string };

    return (
        <div className="bg-slate-300">
            <div className="flex flex-col max-w-[1220px] min-h-screen mx-auto justify-between">
                <div className="flex flex-col justify-between">
                    <div>
                        {
                            user?.role === "HOST" ? (
                                <div>
                                    <HostDashboard />
                                </div>
                            ) : (<div></div>)
                        }
                    </div>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}
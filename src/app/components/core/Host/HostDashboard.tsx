import Link from "next/link"


export default function HostDashboard() {
    return (
        <div className="flex justify-center items-center pt-[130px]">
            <div className=" bg-slate-700 px-20 py-8 flex gap-10 flex-col rounded-2xl">
                <h1>Host Dashboard</h1>
                <div>
                    <h1>Details : </h1>
                    <div></div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-xl font-semibold text-slate-50">
                        Feature Read :
                    </div>


                    <div className="flex flex-col gap-4">
                        <Link href="/host/product" className=" text-slate-200 text-xl hover:underline">Products</Link>
                        <Link href="/host/booking" className=" text-slate-200 text-xl hover:underline">Booking History</Link>
                        <Link href="/host/all-product" className=" text-slate-200 text-xl hover:underline">All Products</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
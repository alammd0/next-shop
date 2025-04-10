import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Dashboard</h1>

            <div>
                <Link href={"/host/dashboard/create-product"}>Create Product</Link>
            </div>
        </div>
    );
}
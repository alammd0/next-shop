'use clients';

import { PhoneLogin } from "@/app/components/core/Auth/PhoneLogin";


export default function Page() {
    return (
        <div className=" bg-slate-300 flex items-center justify-center h-screen">
            <div className="max-w-[1280px] mx-auto flex justify-center gap-11 items-center bg-slate-600 px-10 py-12 rounded-md">
                <PhoneLogin />
            </div>
        </div>
    )
}
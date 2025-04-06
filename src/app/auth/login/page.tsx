'use client'

import { Authfrom } from "@/app/components/core/Auth/Authfrom"
import { Authimage } from "@/app/components/core/Auth/Authimage"

export default function Login() {
    return (
        <div>
            <div>
                <Authfrom type="login" />
                <Authimage type="login" />
            </div>
        </div>
    )
}
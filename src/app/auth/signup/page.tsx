'use client'

import { Authfrom } from "@/app/components/core/Auth/Authfrom"
import { Authimage } from "@/app/components/core/Auth/Authimage"

export default function Signup() {
    return (
        <div>
            <div>
                <Authfrom type="signup" />
                <Authimage type="signup" />
            </div>
        </div>
    )
}
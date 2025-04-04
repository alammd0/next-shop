"use client"

import { signIn } from "next-auth/react"

const AppBar = () => {
    return (
        <div>
            <button onClick={() => signIn()}>SignIn</button>
        </div>
    )
}

export default AppBar

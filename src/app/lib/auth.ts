import CredentialsProvider from "next-auth/providers/credentials";


export const NEXT_AUTH_SECRET = {
    providers: [
        // CredentialsProvider({
        //     name : "Credentials",
        //     credentials: {
        //         username: { label: "Username", type: "text" },
        //         password: { label: "Password", type: "password" },
        //     },
        // })
    ]
};
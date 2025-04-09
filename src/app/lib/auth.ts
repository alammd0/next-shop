import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";


export const NEXT_AUTH_CONFIG = {
    providers: [
        // sgnin with email and password
        CredentialsProvider({
            name: "email & password",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" },
            },


            async authorize(credentials): Promise<any> {
                const { email, password } = credentials as
                    { email: string, password: string };

                // find the user by email
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    }
                });

                // if user not found, return null
                if (!user) {
                    throw new Error("User not found");
                }

                const userPassword = user.password as string;
                const checkPassword = await bcrypt.compare(password, userPassword);

                if (!checkPassword) {
                    throw new Error("Invalid password")
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
            },

        }),

    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        jwt: async ({ token, user }: any) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }
            console.log("Token: ", token);
            return token;
        },

        session: async ({ session, token }: any) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.role = token.role;
            }
            console.log("session: ", session);
            console.log("User ID", session.user.id);
            return session;
        }
    },

    pages: {
        signIn: "/auth/login",
    }
};
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
                    username: user.phoneNumber
                };
            },

        }),

        // sgnin with phone number
        CredentialsProvider({
            name: "Phone OTP",
            credentials: {
                name: { label: "Name", type: "text" },
                phoneNumber: { label: "Phone Number", type: "tel" },
                otp: { label: "OTP", type: "number" },
            },
            async authorize(credentials): Promise<any> {
                const { phoneNumber, otp, name } = credentials as
                    { phoneNumber: string, otp: string, name: string };

                // find user exit or not 
                const user = await prisma.user.findUnique({
                    where: {
                        phoneNumber: phoneNumber
                    }
                })

                if (!user) {
                    throw new Error("User not found");
                }

                // find OPT using Phone Number
                const otpRecord = await prisma.oTPRecord.findUnique({
                    where: {
                        phoneNumber: phoneNumber
                    }
                });

                // if OTP not found
                if (!otpRecord) {
                    throw new Error("OTP not found, Please try again");
                }

                // check OTP
                if (otpRecord.otp !== otp) {
                    throw new Error("Invalid OTP");
                }

                // check OTP expire or not 
                if (otpRecord.expireAt < new Date()) {
                    throw new Error("OTP expired, Please try again");
                }

                // create User
                const newUser = await prisma.user.create({
                    data: {
                        name: name,
                        phoneNumber: phoneNumber
                    }
                })

                // return data
                return {
                    id: newUser.id,
                    name: newUser.name,
                    username: newUser.phoneNumber
                }
            }
        })

    ],

    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ token, user }: any) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        session: ({ session, token }: any) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },

        pages: {
            signIn: "/auth/login",
        }
    }
};
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
    try {

        const { name, email, password, role } = await req.json();

        if (!name || !email || !password || !role) {
            return NextResponse.json({
                error: "Missing credentials",
                message: "All fields are required"
            }, { status: 400 })
        }


        // check user exits or not 
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (user) {
            return NextResponse.json({
                error: "User already exits",
                message: "User already exits"
            }, { status: 400 })
        }

        const hashPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                role: role,
                password: hashPassword
            }
        });

        return NextResponse.json({
            message: "User created successfully",
            data: newUser
        }, { status: 201 });

    }
    catch (err) {
        return NextResponse.json({
            error: "Something went wrong",
            message: err
        }, { status: 500 })
    }
}
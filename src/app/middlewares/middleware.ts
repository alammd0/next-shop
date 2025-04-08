import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/auth/login", "/auth/signup"];

export async function middleware(req: NextRequest) {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const pathName = req.nextUrl.pathname;

    if (!token && !PUBLIC_ROUTES.includes(pathName)) {
        return NextResponse.redirect("/auth/login");
    }

    if (token) {
        const role = token.role;

        if (role === "HOST") {
            return NextResponse.redirect("/dashboard/host");
        } else {
            return NextResponse.redirect("/");
        }
    }

    return NextResponse.next();
}
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth"
import { getServerSession } from "next-auth"

export const GET = async () => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    console.log("Session -> " + session);

    if (!session || session.user.role !== "HOST") {
        return new Response(null, {
            status: 401,
            statusText: "Unauthorized"
        })
    }

    return new Response(null, {
        status: 200,
        statusText: "OK"
    })
}
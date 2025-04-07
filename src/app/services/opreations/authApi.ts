import { headers } from "next/headers";
import { apiConnector } from "../apiconector"

interface authFromData {
    name: string,
    email: string,
    role: string,
    password: string
}

// function signup()
export const signup = async ({ name, email, role, password }: authFromData) => {
    try {
        const res = await apiConnector("POST", "/auth/signup", {
            name,
            email,
            role,
            password
        }, {
            "Content-Type": "application/json"
        });

        console.log("Signup Response : ", res);
        return res;
    }
    catch (err) {
        console.log(err);
    }
}

// function login()
export const login = async ({ email, password }: { email: string, password: string }) => {
    try {
        const response = await apiConnector("POST", "/auth/login", {
            email,
            password
        }, {
            "Content-Type": "application/json"
        });

        console.log("Here -> ", response.data);
        return response
    }
    catch (err) {
        console.log(err);
    }
}
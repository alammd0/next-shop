import { NextRequest, NextResponse } from "next/server";
import { phoneNumberSchema } from "../../lib/zod/auth";
import otpGen from "@/app/utils/otp-gen";
import prisma from "@/app/lib/prisma";
import { sendOTP } from "@/app/utils/send-otp";
import { generateOTPMessage } from "@/app/template/senSMS-template";


export async function POST(req: NextRequest) {
    try {

        // fetch Number 
        const { phoneNumber, name } = await req.json();

        console.log(typeof phoneNumber)
        console.log(phoneNumber);

        const { success } = phoneNumberSchema.safeParse({ phoneNumber, name });
        console.log(success);

        if (!success) {
            return NextResponse.json({
                error: "Missing credentials"
            })
        }

        // Genrate OTP
        const OTP = otpGen();
        console.log("OTP : " + OTP);

        // calculate Expiry Time
        const expireAt = new Date(Date.now() + 5 * 60 * 1000);
        console.log("Expire Time : " + expireAt);

        // entry OTP in DB
        const otpRecord = await prisma.oTPRecord.upsert({
            where: { phoneNumber },
            update: { otp: OTP, createdAt: new Date() }, 
            create: { phoneNumber, otp: OTP, expireAt }
        });


        // send OTP to User 
        await sendOTP(phoneNumber, generateOTPMessage(OTP));

        // remove OTP from DB
        await prisma.oTPRecord.delete({
            where: {
                id: otpRecord.id
            }
        })

        return NextResponse.json({
            message: "OTP Sent Successfully"
        })

    }
    catch (err) {
        console.log(err);
        NextResponse.json({ error: err });
    }
}
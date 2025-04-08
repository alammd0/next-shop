import twilio from "twilio";

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export const sendOTP = async (to: string, body: string) => {
    await client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to
    })
}
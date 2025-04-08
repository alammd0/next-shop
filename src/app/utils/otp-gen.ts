import otpgenrate from "otp-generator";

export default function otpGen() {
    const OTP = otpgenrate.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })

    return OTP;
}
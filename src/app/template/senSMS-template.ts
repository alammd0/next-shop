export const generateOTPMessage = (
    otp: string,
    expiryMinutes: number = 5,
    appName: string = "Next Shop"
): string => {
    return `Your verification code is ${otp}. Please enter this code on the website to continue.
  
  This code is valid for ${expiryMinutes} minutes.
  
  If you did not request this code, please ignore this message.
  
  - ${appName}`;
};

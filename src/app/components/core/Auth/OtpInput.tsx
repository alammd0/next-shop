import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export default function Otp() {
    const [otp, setOtp] = useState('');

    return (
        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
        />
    );
}
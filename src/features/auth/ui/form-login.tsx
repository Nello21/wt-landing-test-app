"use client";

import { useFormOTP } from "../model/use-form-OTP";
import { useFormPhone } from "../model/use-form-phone";
import { FormOTP } from "./form-code";
import { FormPhone } from "./form-phone";

export function FormLogin() {
    const { phoneForm, loginPhone, generatedOTP, phone, isOTPMode } =
        useFormPhone();
    const { otpForm, loginOTP, isPending } = useFormOTP({
        generatedOTP,
        phone,
    });

    return (
        <div className="flex flex-col gap-4 w-4/5 justify-center">
            {!isOTPMode ? (
                <FormPhone phoneForm={phoneForm} loginPhone={loginPhone} />
            ) : (
                <FormOTP
                    otpForm={otpForm}
                    loginOTP={loginOTP}
                    isPending={isPending}
                />
            )}
        </div>
    );
}

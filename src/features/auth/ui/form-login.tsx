"use client";

import { useFormOTP } from "../model/use-form-OTP";
import { useFormPhone } from "../model/use-form-phone";
import { FormOTP } from "./form-code";
import { FormPhone } from "./form-phone";

export function FormLogin() {
    const {
        phoneForm,
        loginPhone,
        generatedOTP,
        phone,
        isOTPMode,
        isPending: isPhonePending,
    } = useFormPhone();
    const { otpForm, loginOTP, isPending } = useFormOTP({
        generatedOTP,
        phone,
    });

    return (
        <div className="flex flex-col gap-4 w-3/5 justify-center pb-5">
            {!isOTPMode ? (
                <FormPhone
                    phoneForm={phoneForm}
                    loginPhone={loginPhone}
                    isPending={isPhonePending}
                />
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

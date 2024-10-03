import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postToAero } from "@/entity/user/_actions/post-to-aero";

const phoneSchema = z.object({
    phone: z.string().min(1, {
        message: "Обязательное поле",
    }),
});

export const useFormPhone = () => {
    const [phone, setPhone] = useState<string>("");
    const [generatedOTP, setGeneratedOTP] = useState<string>("");
    const [isOTPMode, setIsOTPMode] = useState(false);

    const phoneForm = useForm<z.infer<typeof phoneSchema>>({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phone: "",
        },
    });

    async function onSubmitPhone(values: z.infer<typeof phoneSchema>) {
        const phone = values.phone;
        setPhone(phone);
        const message = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOTP(message);

        try {
            await postToAero({ phone, message });

            setIsOTPMode(true);
            console.log(message);
        } catch (error: any) {
            phoneForm.setError("root", {
                message: error?.message ?? "Ошибка отправки SMS",
            });
        }
    }

    return {
        loginPhone: phoneForm.handleSubmit(onSubmitPhone),
        phoneForm,
        isOTPMode,
        generatedOTP,
        phone,
    };
};

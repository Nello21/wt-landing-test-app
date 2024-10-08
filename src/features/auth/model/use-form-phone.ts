import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postToAero } from "@/entity/user/_actions/post-to-aero";
import { useMutation } from "@tanstack/react-query";

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

    const { mutate, isPending } = useMutation({
        mutationFn: postToAero,
        onSuccess: () => setIsOTPMode(true),
        onError: (error) => {
            phoneForm.setError("root", {
                message: error.message ?? "Ошибка смс сервиса",
            });
        },
    });

    async function onSubmitPhone(values: z.infer<typeof phoneSchema>) {
        const phone = values.phone;
        setPhone(phone);
        const message = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOTP(message);
        console.log(message);

        mutate({ phone, message });
    }

    return {
        loginPhone: phoneForm.handleSubmit(onSubmitPhone),
        phoneForm,
        isOTPMode,
        generatedOTP,
        phone,
        isPending,
    };
};

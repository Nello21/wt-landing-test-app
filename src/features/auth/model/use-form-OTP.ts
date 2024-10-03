import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/entity/user/_actions/login";
import { useInvalidateSession } from "@/entity/user/_queries";

const otpSchema = z.object({
    code: z.string().length(4, {
        message: "Введите 4-значный код",
    }),
});

export const useFormOTP = ({
    generatedOTP,
    phone,
}: {
    generatedOTP: string;
    phone: string;
}) => {
    const router = useRouter();
    const invalidateSession = useInvalidateSession();

    const otpForm = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            code: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: async () => {
            await invalidateSession();
            router.replace("/");
        },
        onError: (error) => {
            otpForm.setError("root", {
                message: error.message ?? "Неверный код",
            });
        },
    });

    async function onSubmitOTP(values: z.infer<typeof otpSchema>) {
        if (values.code === generatedOTP) {
            mutate({
                phone: phone,
            });
        } else {
            otpForm.setError("root", {
                message: "Неверный код",
            });
        }
    }

    return {
        loginOTP: otpForm.handleSubmit(onSubmitOTP),
        otpForm,
        isPending,
    };
};

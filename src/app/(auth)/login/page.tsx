import { FormLogin } from "@/features/auth/ui/form-login";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center h-[100dvh]">
            <div className="flex flex-col items-center justify-center w-full max-w-[520px] h-full max-h-[373px] bg-white p-4 shadow-lg rounded-lg space-y-2">
                <h1 className="text-4xl font-bold">Авторизация</h1>
                <FormLogin />
            </div>
        </div>
    );
}

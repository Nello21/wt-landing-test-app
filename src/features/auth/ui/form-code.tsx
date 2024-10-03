import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/shared/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { cn } from "@/shared/lib/utils";

export const FormOTP = ({
    otpForm,
    loginOTP,
    isPending,
}: {
    otpForm: any;
    loginOTP: any;
    isPending: boolean;
}) => {
    return (
        <Form {...otpForm}>
            {otpForm.formState.errors.root && (
                <Alert variant="destructive">
                    <AlertTitle className="font-semibold text-xl">
                        Ошибка
                    </AlertTitle>
                    <AlertDescription className="text-xl">
                        {otpForm.formState.errors.root.message}
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={loginOTP} className="grid gap-2">
                <FormField
                    control={otpForm.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputOTP
                                    maxLength={4}
                                    {...field}
                                    className={cn("h-[44px]", {
                                        "border-red-600 bg-red-50":
                                            otpForm.formState.errors.root,
                                    })}
                                >
                                    <InputOTPGroup className="h-[44px] gap-2">
                                        <InputOTPSlot
                                            index={0}
                                            className="rounded-3xl border-blue-dark"
                                        />
                                        <InputOTPSlot
                                            index={1}
                                            className="rounded-3xl border-blue-dark"
                                        />
                                        <InputOTPSlot
                                            index={2}
                                            className="rounded-3xl border-blue-dark"
                                        />
                                        <InputOTPSlot
                                            index={3}
                                            className="rounded-3xl border-blue-dark"
                                        />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="h-[44px] rounded-3xl bg-blue-dark text-white"
                    disabled={isPending}
                >
                    Проверить код
                </Button>
            </form>
        </Form>
    );
};

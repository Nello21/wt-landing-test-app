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
                                    className={cn("", {
                                        "border-red-600 bg-red-50 flex gap-3":
                                            otpForm.formState.errors.root,
                                    })}
                                >
                                    <InputOTPGroup className="rounded-xl">
                                        <InputOTPSlot index={0} />
                                    </InputOTPGroup>
                                    <InputOTPGroup className="rounded-xl">
                                        <InputOTPSlot index={1} />
                                    </InputOTPGroup>
                                    <InputOTPGroup className="rounded-xl">
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPGroup className="rounded-xl">
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    Проверить код
                </Button>
            </form>
        </Form>
    );
};

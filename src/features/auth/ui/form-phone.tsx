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
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import Lock from "/public/icons/lock.svg";
import { UseFormReturn } from "react-hook-form";
import { BaseSyntheticEvent } from "react";

export const FormPhone = ({
    phoneForm,
    loginPhone,
}: {
    phoneForm: UseFormReturn<
        {
            phone: string;
        },
        undefined
    >;
    loginPhone: (e?: BaseSyntheticEvent) => Promise<void>;
}) => {
    return (
        <div>
            <Form {...phoneForm}>
                {phoneForm.formState.errors.root && (
                    <Alert variant="destructive">
                        <AlertTitle className="font-semibold text-xl">
                            Ошибка
                        </AlertTitle>
                        <AlertDescription className="text-xl">
                            {phoneForm.formState.errors.root.message}
                        </AlertDescription>
                    </Alert>
                )}
                <form onSubmit={loginPhone} className="grid gap-2">
                    <FormField
                        control={phoneForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative flex items-center justify-center">
                                        <div className="absolute left-3">
                                            <Lock size={20} fill="lightgray" />
                                        </div>
                                        <Input
                                            placeholder="Номер телефона"
                                            {...field}
                                            className={cn(
                                                "h-[44px] rounded-2xl border-blue-dark placeholder:text-gray-dark pl-8",
                                                {
                                                    "border-red-600 bg-red-50":
                                                        phoneForm.formState
                                                            .errors.root,
                                                }
                                            )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="h-[44px] rounded-2xl bg-blue-dark text-white"
                    >
                        Выслать код
                    </Button>
                </form>
            </Form>
        </div>
    );
};

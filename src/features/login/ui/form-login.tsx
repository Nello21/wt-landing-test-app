"use client";

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
import { useFormLogin } from "../model/use-form-login";

export function FormLogin() {
    const { login, form, isPending } = useFormLogin();

    return (
        <Form {...form}>
            {form.formState.errors.root && (
                <Alert variant="destructive">
                    <AlertTitle className="font-semibold text-xl">
                        Ошибка
                    </AlertTitle>
                    <AlertDescription className="text-xl">
                        {form.formState.errors.root.message}{" "}
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={login} className="grid gap-2">
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Номер телефона"
                                    {...field}
                                    className={cn("", {
                                        "border-red-600 bg-red-50":
                                            form.formState.errors.root,
                                    })}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="password"
                                    placeholder="Пароль"
                                    {...field}
                                    className={cn("", {
                                        "border-red-600 bg-red-50":
                                            form.formState.errors.root,
                                    })}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <Button type="submit">Войти</Button>
            </form>
        </Form>
    );
}

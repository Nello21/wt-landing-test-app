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

export const FormPhone = ({
    phoneForm,
    loginPhone,
}: {
    phoneForm: any;
    loginPhone: any;
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
                                    <Input
                                        placeholder="Номер телефона"
                                        {...field}
                                        className={cn("", {
                                            "border-red-600 bg-red-50":
                                                phoneForm.formState.errors.root,
                                        })}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Отправить код</Button>
                </form>
            </Form>
        </div>
    );
};

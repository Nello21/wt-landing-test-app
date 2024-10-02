"use server";
import { prisma } from "@/shared/lib/prisma";
import { setSession } from "./session";
import { CustomError, ERROR_CODES } from "@/shared/lib/errors";

export const login = async ({
    phone,
    code,
}: {
    phone: string;
    code: string;
}): Promise<void> => {
    const user = await prisma.user.findFirst({
        where: {
            phone,
        },
    });

    if (!user) {
        throw new CustomError({
            message: "Пользователь не найден",
            code: ERROR_CODES.USER_NOT_FOUND,
        });
    }

    const isCodeValid = await verifyCode(phone, code);
    if (!isCodeValid) {
        throw new CustomError({
            message: "Неверный код",
            code: ERROR_CODES.INVALID_CODE,
        });
    }

    setSession({ data: { id: user.id, phone: user.phone } });
};

async function verifyCode(phone: string, code: string): Promise<boolean> {
    // Логика проверки кода через SMS Aero или другую службу
    // Например, проверка кода из базы данных или кеша
    // Вернуть true, если код верный, иначе false
    return true;
}

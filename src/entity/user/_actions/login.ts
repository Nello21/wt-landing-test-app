"use server";
import { prisma } from "@/shared/lib/prisma";
import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { setSession } from "./session";

export const login = async ({ phone }: { phone: string }): Promise<void> => {
    try {
        const user = await prisma.user.findFirst({
            where: { phone },
        });

        if (user) {
            setSession({ id: user.id, phone: user.phone });
        }
    } catch (error) {
        console.error("Ошибка при авторизации:", error);

        if (error instanceof CustomError) {
            throw error;
        } else {
            throw new CustomError({
                message: "Произошла ошибка при авторизации",
                code: ERROR_CODES.BAD_REQUEST,
            });
        }
    }
};

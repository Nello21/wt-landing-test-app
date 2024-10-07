"use server";
import { prisma } from "@/shared/lib/prisma";
import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { setSession } from "./session";

export const login = async ({ phone }: { phone: string }): Promise<void> => {
    let user = await prisma.user.findFirst({
        where: {
            phone,
        },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                phone,
            },
        });
    }

    if (!user) {
        throw new CustomError({
            message: "Пользователь не найден",
            code: ERROR_CODES.NOT_FOUND,
        });
    }

    setSession({ id: user.id, phone: user.phone });
};

"use server";
import { cookie } from "@/shared/lib/cookie";
import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";

const COOKIE_SESSION_KEY = "SESSION";

export const getServerSession = async (): Promise<{
    id: number;
    phone: string;
}> => {
    const sessionCookie = cookie.get({ key: COOKIE_SESSION_KEY });

    if (!sessionCookie) {
        throw new CustomError({
            message: "Сессия не установлена",
            code: ERROR_CODES.UNAUTHORIZED,
        });
    }

    const session = JSON.parse(sessionCookie.value);

    const user = await prisma.user.findFirst({
        where: {
            id: session.id,
        },
    });

    if (!user) {
        throw new CustomError({
            message: "Пользователь не найден",
            code: ERROR_CODES.UNAUTHORIZED,
        });
    }

    return {
        id: user.id,
        phone: user.phone,
    };
};

export const setSession = async ({
    id,
    phone,
}: {
    id: number;
    phone: string;
}) => {
    cookie.set({
        key: COOKIE_SESSION_KEY,
        value: JSON.stringify({ id, phone }),
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60,
        },
    });
};

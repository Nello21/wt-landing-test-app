"use server";
import { cookie } from "@/shared/lib/cookie";
import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";

const COOKIE_SESSION_KEY = "SESSION";

export const getServerSession = async (): Promise<{
    id: number;
    phone: string;
} | null> => {
    try {
        const sessionCookie = cookie.get({ key: COOKIE_SESSION_KEY });

        console.log("cookie", sessionCookie);

        if (!sessionCookie) {
            return null;
        }

        const session = JSON.parse(sessionCookie.value);

        const user = await prisma.user.findFirst({
            where: { id: session.id },
        });

        if (!user) {
            throw new CustomError({
                message: "Пользователь не найден",
                code: ERROR_CODES.UNAUTHORIZED,
            });
        }

        console.log("getSession", { id: user.id, phone: user.phone });

        return { id: user.id, phone: user.phone };
    } catch (error) {
        console.error("Error in getServerSession:", error);
        throw new CustomError({
            message: "Ошибка при получении сессии",
            code: ERROR_CODES.BAD_REQUEST,
        });
    }
};

export const setSession = async ({
    id,
    phone,
}: {
    id: number;
    phone: string;
}) => {
    try {
        cookie.set({
            key: COOKIE_SESSION_KEY,
            value: JSON.stringify({ id, phone }),
            options: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 24 * 60 * 60,
            },
        });
    } catch (error) {
        console.error("Error in setSession:", error);
        throw new CustomError({
            message: "Ошибка при установке сессии",
            code: ERROR_CODES.BAD_REQUEST,
        });
    }
};

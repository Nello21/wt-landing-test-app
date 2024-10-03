"use server";

import { CustomError, ERROR_CODES } from "@/shared/lib/errors";
import { prisma } from "@/shared/lib/prisma";
import { Product } from "../_domain/types";

export const getTasks = async (): Promise<Product[]> => {
    const products = await prisma.product.findMany();
    if (!products) {
        throw new CustomError({
            message: "Товары не найдены",
            code: ERROR_CODES.NOT_FOUND,
        });
    }

    return products;
};

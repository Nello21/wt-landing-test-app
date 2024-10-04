"use server";

import { prisma } from "@/shared/lib/prisma";
import { Product } from "../_domain/types";

const prepareQuery = (query: string) => {
    const decodedQuery = decodeURIComponent(query);
    return decodedQuery.split(/\s+/);
};

export const getFilteredProducts = async (
    query: string
): Promise<Product[]> => {
    console.log(query);
    if (!query) return [];

    const searchTerms = prepareQuery(query);

    const products = await prisma.product.findMany({
        where: {
            OR: searchTerms.map((term) => ({
                OR: [
                    { name: { contains: term.toLowerCase() } },
                    { article: { contains: term.toLowerCase() } },
                    { code: { contains: term.toLowerCase() } },
                ],
            })),
        },
    });

    if (products.length === 0) {
        console.warn("No products found for query:", query);
        return [];
    }

    return products;
};

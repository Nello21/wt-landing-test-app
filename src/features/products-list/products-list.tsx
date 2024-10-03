"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ProductCard } from "./product-card";
import { Product } from "@/entity/products/_domain/types";
import { useProducts } from "@/entity/products/_queries";
import { PacmanLoader } from "react-spinners";

export default function productsList() {
    const { data, error, isLoading } = useProducts();
    const searchParams = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";

    const filteredProducts = useMemo(() => {
        if (!data) return [];
        return data.filter((product: Product) =>
            product.name.toLowerCase().includes(query)
        );
    }, [data, query]);

    if (isLoading) {
        return <PacmanLoader />;
    }

    if (error) {
        return <div>Error loading movies</div>;
    }

    return (
        <div className="flex flex-col gap-6 items-start max-w-[1128px]">
            {filteredProducts.length === 0 ? (
                <div className="text-center text-lg">Товары не найдены</div>
            ) : (
                <div className="flex flex-col gap-4 overflow-hidden">
                    {filteredProducts.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

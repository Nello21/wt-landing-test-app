"use client";

import { ProductCard } from "./product-card";
import { Product } from "@/entity/products/_domain/types";
import { useProductData } from "./use-products-data";
import { Loader } from "@/shared/components/ui/pacman-loader";

export default function ProductsList() {
    const { products, query, error, isLoading, isPending } = useProductData();

    if (isLoading || isPending) {
        return (
            <div className="flex items-center justify-center h-[65dvh] w-full">
                <Loader />
            </div>
        );
    }

    if (error) {
        return <div>Ошибка загрузки товаров</div>;
    }

    return (
        <div className="flex flex-col gap-6 items-start max-w-[1128px]">
            {products.length === 0 ? (
                <div className="text-center text-lg">История поиска пуста</div>
            ) : (
                <div className="flex flex-col gap-4 overflow-hidden">
                    {products.map((product: Product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            query={query}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

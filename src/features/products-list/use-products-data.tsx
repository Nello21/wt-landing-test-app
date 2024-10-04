import { useEffect, useState, useTransition } from "react";
import { useProducts } from "@/entity/products/_queries";
import { Product } from "@/entity/products/_domain/types";
import { useSearchParams } from "next/navigation";

export const useProductData = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const searchParams = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";
    const [isPending, startTransition] = useTransition();

    const { data, error, isLoading } = useProducts({ query });

    useEffect(() => {
        if (query && data) {
            startTransition(() => {
                setProducts(data);
            });
        } else {
            setProducts([]);
        }
    }, [query, data, startTransition]);

    return { products, query, error, isLoading, isPending };
};

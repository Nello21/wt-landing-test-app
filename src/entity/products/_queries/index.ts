import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "../_actions/get-products";

export function useProducts({ query }: { query: string }) {
    return useQuery({
        queryKey: ["products", query],
        queryFn: () => getFilteredProducts(query),
        enabled: !!query,
        staleTime: 1000 * 60 * 5,
    });
}

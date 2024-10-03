import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../_actions/get-products";

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => getTasks(),
    });
}

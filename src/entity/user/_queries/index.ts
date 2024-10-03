import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getServerSession } from "../_actions/session";

const sessionKey = "session";

export function useSession() {
    return useQuery({
        queryKey: [sessionKey],
        queryFn: () => getServerSession(),
        retry: 0,
        staleTime: 5 * 60 * 1000,
    });
}

export function useInvalidateSession() {
    const queryClient = useQueryClient();
    return () =>
        queryClient.invalidateQueries({
            queryKey: [sessionKey],
        });
}

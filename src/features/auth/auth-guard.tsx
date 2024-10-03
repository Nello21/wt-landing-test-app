"use client";

import { useSession } from "@/entity/user/_queries";
import { useRouter } from "next/navigation";
import { PacmanLoader } from "react-spinners";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const session = useSession();
    if (session.isLoading) {
        return <PacmanLoader />;
    }
    if (session.isError) {
        router.replace("/login");
        return;
    }
    if (!session) {
        router.replace("/login");
        return;
    }

    return <>{children}</>;
};

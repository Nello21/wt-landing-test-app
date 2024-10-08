"use client";

import { useSession } from "@/entity/user/_queries";
import { Loader } from "@/shared/components/ui/pacman-loader";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const session = useSession();
    const pathname = usePathname();

    useEffect(() => {
        if (!session.isLoading && !session.data?.id && pathname !== "/login") {
            router.replace("/login");
        }
    }, [session.isLoading, session.data, pathname, router]);

    if (session.isLoading) {
        return (
            <div className="min-h-[85dvh] flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!session.data?.id && pathname !== "/login") {
        return null;
    }

    return <>{children}</>;
};

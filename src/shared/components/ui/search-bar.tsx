"use client";

import React, { FC } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./input";

interface SearchBarProps {
    placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({ placeholder }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative w-full">
            <Input
                type="search"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get("query")?.toString()}
                className="rounded-3xl bg-background pl-8 border-blue-light md:h-[44px] focus-visible:ring-[0.5px]"
            />
            <div className="flex items-center justify-center h-full bg-blue-dark rounded-3xl absolute right-0 top-0 w-full max-w-[70px]">
                <Search className="text-white" size={18} />
            </div>
        </div>
    );
};

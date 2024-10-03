"use client";

import React, { FC, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../../shared/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../../shared/components/ui/dialog";
import { Button } from "../../shared/components/ui/button";
import ProductsList from "@/features/products-list/products-list";
import { useProducts } from "@/entity/products/_queries";

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
    }, 100);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative w-full">
                    <Input
                        type="search"
                        placeholder={placeholder}
                        className="rounded-3xl bg-background pl-8 border-blue-light md:h-[44px] focus-visible:ring-[0.5px]"
                    />
                    <div className="flex items-center justify-center h-full bg-blue-dark rounded-3xl absolute right-0 top-0 w-full max-w-[70px]">
                        <Search className="text-white" size={18} />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent
                aria-describedby={undefined}
                className="max-w-[1300px] h-4/5 flex flex-col items-center bg-white overflow-scroll overflow-x-hidden"
            >
                <DialogTitle />
                <div className="flex flex-col items-center gap-3 w-full">
                    <div className="relative w-full">
                        <Input
                            type="search"
                            placeholder={placeholder}
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                            defaultValue={searchParams.get("query")?.toString()}
                            className="rounded-lg bg-gray-light pl-8 border-none md:h-[44px] focus-visible:ring-0"
                        />

                        <div className="flex items-center justify-center h-full w-full">
                            <DialogClose></DialogClose>
                            <Button className="flex text-center h-full bg-blue-dark rounded-lg absolute right-0 top-0 w-full max-w-[70px] text-white">
                                Найти
                            </Button>
                        </div>
                    </div>
                    <div className="w-full overflow-hidden">
                        <ProductsList />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

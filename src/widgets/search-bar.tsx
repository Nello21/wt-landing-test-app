"use client";

import React, { FC } from "react";
import { Search } from "lucide-react";
import { Input } from "../shared/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../shared/components/ui/dialog";
import { Button } from "../shared/components/ui/button";
import ProductsList from "@/features/products-list/products-list";
import { useProductParams } from "../features/products-list/use-products-params";
import { Plus } from "lucide-react";

interface SearchBarProps {
    placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({ placeholder }) => {
    const { handleInputChange, value } = useProductParams();

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
                <DialogTitle className="hidden" />
                <div className="flex flex-col items-center gap-3 w-full">
                    <div className="relative w-full">
                        <Input
                            type="search"
                            placeholder={placeholder}
                            onChange={handleInputChange}
                            value={value}
                            className="rounded-lg bg-gray-light pl-8 border-none md:h-[44px] focus-visible:ring-0"
                        />

                        <div className="absolute right-0 top-0 flex items-center h-full">
                            <DialogClose className="transform rotate-45 mr-2">
                                <Plus />
                            </DialogClose>
                            <Button className="h-full bg-blue-dark rounded-lg text-white px-3">
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

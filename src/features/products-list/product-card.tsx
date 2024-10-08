import { Product } from "@/entity/products/_domain/types";
import { Search } from "lucide-react";
import { highlightMatch } from "./highlight-match";
import { memo } from "react";

export const ProductCard = memo(
    ({ product, query }: { product: Product; query: string }) => {
        return (
            <div className="flex flex-row items-center p-2 gap-4 w-full hover:bg-gray-light transition-colors rounded-md">
                <div className="flex items-center justify-center w-full max-w-[30px] h-[30px] bg-gray-light rounded-md">
                    <Search
                        size={20}
                        strokeWidth="2.5px"
                        className="text-gray-dark"
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <span>
                        {highlightMatch(product.article, query)}-
                        {highlightMatch(product.name, query)}
                    </span>
                    <span>{highlightMatch(product.code, query)}</span>
                </div>
            </div>
        );
    }
);

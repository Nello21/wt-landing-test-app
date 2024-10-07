"use client";

import Link from "next/link";
import Logo from "/public/icons/logo.svg";
import Title from "/public/icons/title.svg";
import Phone from "/public/icons/phone.svg";
import User from "/public/icons/user.svg";
import { SearchBar } from "../widgets/search-bar";
import { useSession } from "@/entity/user/_queries";

export const Header = () => {
    const session = useSession();
    console.log(session);

    return (
        <nav className="fixed bottom-0 sm:sticky sm:top-0 max-[640px]:fixed max-[640px]:bottom-0 max-[640px]:flex-col z-50 max-h-[94px] w-full px-4 bg-white">
            <div className="h-full flex items-center justify-evenly py-4">
                <div className="flex gap-10">
                    <Link
                        href="/"
                        className="flex items-center space-x-1 hover:scale-105 transition-transform"
                    >
                        <Logo size={40} />
                        <Title
                            size={40}
                            className="text-2xl md:text-3xl lg:text-4xl uppercase max-[640px]:hidden"
                        />
                    </Link>
                    <div className="lg:w-[658px]">
                        {session.data && <SearchBar />}
                    </div>
                </div>

                <div className="flex gap-4 max-w-[255px]">
                    <div className="flex gap-1 items-center">
                        <Phone width={20} height={20} />
                        <span className="max-[640px]:hidden uppercase text-nowrap font-semibold">
                            8 900 541-24-55
                        </span>
                    </div>
                    <Link href="/login" className="flex gap-1 items-center">
                        <User width={20} height={20} />
                        <span className="max-[640px]:hidden">Профиль</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

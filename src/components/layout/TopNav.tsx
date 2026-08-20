"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import ProfileButton from "@/components/layout/ProfileButton";
import { findNav } from "@/lib/nav";

export default function TopNav() {
    const pathname = usePathname() ?? "/";
    const current = findNav(pathname);
    const crumbs = current?.crumbs ?? ["Analytics"];

    return (
        <header className="flex h-14 shrink-0 items-center gap-3 px-5">
            <nav className="flex min-w-0 flex-1 items-center gap-2 text-[13px] font-medium text-[#8B83A3]">
                <Link href="/analytics" className="hover:text-white">
                    Home
                </Link>
                {crumbs.map((crumb, index) => (
                    <span key={`${crumb}-${index}`} className="flex items-center gap-2">
                        <span className="text-[#5C566F]">/</span>
                        <span className={index === crumbs.length - 1 ? "truncate text-white" : "truncate"}>
                            {crumb}
                        </span>
                    </span>
                ))}
            </nav>

            <label className="relative hidden h-9 w-[250px] items-center xl:flex">
                <Search
                    size={13}
                    className="pointer-events-none absolute left-3 text-[#7A738F]"
                />
                <input
                    type="search"
                    placeholder="Press / to open spotlight"
                    className="h-9 w-full rounded-full border border-white/8 bg-[#1A1724] pr-12 pl-8 text-[12px] font-medium text-white outline-none placeholder:text-[#6D6580]"
                />
                <span className="absolute right-2 flex items-center gap-0.5 rounded-md border border-white/10 bg-white/4 px-1.5 py-0.5 text-[10px] font-semibold text-[#9A92B3]">
                    ⌘F
                </span>
            </label>

            <ProfileButton />
        </header>
    );
}

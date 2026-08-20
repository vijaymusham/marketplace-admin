"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_LINKS, isExactNavMatch } from "@/lib/nav";
import { NAV_ICONS } from "@/lib/nav-icons";

function navClass(active: boolean) {
    const base =
        "flex min-h-[34px] items-center gap-2.5 rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 group";

    if (active) {
        return `${base} bg-gradient-to-r from-[#6E56F5] via-[#6E56F5]/25 to-transparent text-white`;
    }

    return `${base} text-[#B7B0CC] hover:bg-gradient-to-r from-gray-500 via-gray-500/20 to-transparent group-hover:text-white`;
}

export default function Sidebar() {
    const pathname = usePathname() ?? "/";

    return (
        <aside className="flex min-h-0 w-[208px] shrink-0 flex-col pb-3 pr-1">

            <nav className="dash-scroll flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
                {PRIMARY_LINKS.map((item) => {
                    const Icon = NAV_ICONS[item.id];
                    const active = isExactNavMatch(item.href, pathname);

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            title={item.label}
                            aria-current={active ? "page" : undefined}
                            className={navClass(active)}
                        >
                            {Icon ? (
                                <Icon
                                    size={15}
                                    strokeWidth={active ? 2.2 : 1.9}
                                    className="shrink-0"
                                />
                            ) : null}
                            <span className="flex-1 text-left text-sm font-semibold leading-[1.2]">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

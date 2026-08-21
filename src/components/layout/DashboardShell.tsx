"use client";

import { usePathname } from "next/navigation";
import IconRail from "@/components/sidebar/IconRail";
import Sidebar from "@/components/sidebar/Sidebar";
import TopNav from "@/components/layout/TopNav";

const AUTH_PATHS = new Set(["/login"]);

export default function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname() ?? "/";

    if (AUTH_PATHS.has(pathname)) {
        return <div className="h-full">{children}</div>;
    }

    return (
        <div className="dash-frame flex h-screen w-full overflow-hidden p-3">
            <div className="flex min-h-0 min-w-0 flex-1">
                <div className="flex w-73 shrink-0 flex-col">
                    <div className="flex h-14 items-center gap-2.5 pl-3">
                        <span className="text-2xl font-black tracking-tight text-white">
                            Deal Pokket
                        </span>
                    </div>
                    <div className="flex min-h-0 flex-1">
                        <IconRail />
                        <Sidebar />
                    </div>
                </div>
                <section className="dash-scroll min-w-0 flex-1 overflow-y-auto rounded-3xl border border-white/6 bg-[#14121C] ">
                    <TopNav />
                    {children}
                </section>
            </div>
        </div>
    );
}

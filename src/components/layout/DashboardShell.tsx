"use client";

import IconRail from "@/components/sidebar/IconRail";
import Sidebar from "@/components/sidebar/Sidebar";
import TopNav from "@/components/layout/TopNav";

function LivelyLogo() {
    return (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
            <rect width="32" height="32" rx="8" fill="url(#lively-g)" />
            <path d="M12.2 8.6L23 16L12.2 23.4V8.6Z" fill="white" />
            <defs>
                <linearGradient id="lively-g" x1="2" y1="0" x2="32" y2="32">
                    <stop stopColor="#4F8CFF" />
                    <stop offset="0.55" stopColor="#6B6CFF" />
                    <stop offset="1" stopColor="#8B5CFF" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
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

"use client";

import { LayoutGrid, Mail, Bell, SlidersHorizontal, LogOut } from "lucide-react";

const NAV = [
    { id: "home", label: "Home", icon: LayoutGrid, active: true },
    { id: "inbox", label: "Inbox", icon: Mail },
    { id: "notify", label: "Notify", icon: Bell, badge: true },
    { id: "settings", label: "Settings", icon: SlidersHorizontal, circled: false },
] as const;

export default function IconRail() {
    return (
        <nav className="flex w-[64px] shrink-0 flex-col items-center pb-4">
            <div className="flex flex-1 flex-col items-center gap-6 pt-1">
                {NAV.map((item) => {
                    const Icon = item.icon;
                    const circled = "circled" in item && item.circled;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            className="group relative flex flex-col items-center gap-1.5"
                        >
                            <span
                                className={
                                    item.active
                                        ? "grid size-[42px] place-items-center rounded-full bg-[#6E56F5] text-white shadow-[0_0_0_4px_rgba(110,86,245,0.18),0_10px_28px_rgba(110,86,245,0.4)]"
                                        : circled
                                            ? "grid size-[42px] place-items-center rounded-full border border-white/15 text-[#8B83A3] transition-colors group-hover:border-white/30 group-hover:text-white"
                                            : "grid size-[42px] place-items-center rounded-full text-[#8B83A3] transition-colors group-hover:bg-white/5 group-hover:text-white"
                                }
                            >
                                <Icon size={18} strokeWidth={item.active ? 2.2 : 1.85} />
                            </span>
                            {"badge" in item && item.badge ? (
                                <span className="absolute right-[7px] top-0 size-[7px] rounded-full bg-[#FF4D6A] ring-2 ring-[#0C0A13]" />
                            ) : null}
                            <span
                                className={`text-[10px] font-semibold tracking-tight ${item.active ? "text-white" : "text-[#7A738F]"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                className="grid size-8 place-items-center text-[#7A738F] transition-colors hover:text-white"
                aria-label="Back"
            >
                <LogOut size={16} strokeWidth={1.8} className="-scale-x-100" />
            </button>
        </nav>
    );
}

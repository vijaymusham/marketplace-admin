"use client";

import { Copy } from "lucide-react";
import toast from "react-hot-toast";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

const STATUS_STYLES: Record<string, string> = {
    New: "text-emerald-400",
    Active: "text-emerald-400",
    Inactive: "text-red-400",
    Pending: "text-amber-400",
    "Arrived Late": "text-red-400",
    "Arrived On Time": "text-emerald-400",
    "Left Early": "text-amber-400",
    "Worked Less than half day": "text-red-400",
};

export function StatusBadge({ status }: { status: string }) {
    return (
        <span className={cn("font-semibold", STATUS_STYLES[status] ?? "text-[#D6D0E8]")}>
            {status}
        </span>
    );
}

export function TableId({ row }: { row?: string | { id?: string } }) {
    if (!row) return null;
    const idStr = typeof row === "string" ? row : row?.id;
    return (
        <div className="flex items-center gap-2">
            <span className="uppercase">#{idStr?.slice(-10) || "---- -----"}</span>
            <Copy
                className="cursor-pointer text-primary hover:text-primary-hover"
                size={16}
                onClick={() => {
                    if (!idStr) return;
                    navigator.clipboard.writeText(idStr);
                    toast.success("ID Copied!");
                }}
            />
        </div>
    );
}

export function TableDate({ row }: { row?: { createdAt?: string | number | Date } }) {
    const value = row?.createdAt;
    if (!value) {
        return <span className="text-sm text-[#8B83A3]">---- -----</span>;
    }

    const date = new Date(value);
    return (
        <span className="text-sm">
            <div className="font-medium">
                {date.toLocaleDateString("en-GB").replace(/\//g, "-")}
            </div>
            <div className="text-xs text-[#8B83A3]">
                {date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
        </span>
    );
}

export function TableActiveStatus({ row }: { row?: { isActive?: boolean } }) {
    const status = row?.isActive ? "Active" : "Inactive";
    return <StatusBadge status={status} />;
}

export function TableSwitch({
    value,
    handleFun,
}: {
    value: boolean;
    handleFun: (checked: boolean) => void;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={value}
            onClick={() => handleFun(!value)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
                value ? "bg-primary" : "bg-white/15"
            }`}
        >
            <span
                className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${
                    value ? "translate-x-5" : ""
                }`}
            />
        </button>
    );
}

export function TableSwitchId({
    value,
    handleFun,
    id,
}: {
    value: boolean;
    handleFun: (id: string, checked: boolean) => void;
    id: string;
}) {
    return <TableSwitch value={value} handleFun={(checked) => handleFun(id, checked)} />;
}

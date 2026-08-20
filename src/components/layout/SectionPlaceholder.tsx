"use client";

import { Calendar } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import ModalExampleContent from "@/components/ui/ModalExampleContent";
import { useModal } from "@/components/ui/Modal";

export default function SectionPlaceholder({ label }: { label: string }) {
    const { open } = useModal();

    return (
        <div className="flex h-full flex-col p-6">
            <div className="rounded-3xl border border-white/8 bg-[#1A1724] px-6 py-8">
                <p className="text-[11px] font-bold tracking-[0.16em] text-[#8B83A3] uppercase">
                    Analytics
                </p>
                <h1 className="mt-2 text-[28px] font-bold tracking-tight text-white">
                    {label}
                </h1>
                <p className="mt-2 max-w-lg text-[13px] font-medium text-[#8B83A3]">
                    This section is ready to wire up. The sidebar tab stays active while you
                    work here.
                </p>
                <GlowButton
                    className="mt-6"
                    onClick={() =>
                        open({
                            title: "Build your custom study plan",
                            size: "xl",
                            content: <ModalExampleContent />,
                        })
                    }
                >
                    Open modal
                </GlowButton>
            </div>
        </div>
    );
}

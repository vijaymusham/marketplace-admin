"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

const TIMELINES = [
    { months: 1, label: "month" },
    { months: 3, label: "months" },
    { months: 9, label: "months" },
    { months: 12, label: "months" },
] as const;

export default function ModalExampleContent() {
    const [months, setMonths] = useState(3);
    const [days, setDays] = useState("");
    const [hours, setHours] = useState(3.5);

    const pace = hours < 2 ? "Light" : hours < 5 ? "Steady" : "Intense";
    const paceCopy =
        hours < 2
            ? "A gentle pace — extra room around a busy week."
            : hours < 5
              ? "A solid daily habit — sustainable alongside college or work."
              : "A focused sprint — best if this is your main priority.";

    const stats = useMemo(() => {
        const weeks = months * 4.333;
        return {
            date: "Nov 4, 2026",
            weeks: Math.round(weeks),
            hours: Math.round(weeks * 24.5),
            modules: 5,
            hoursWeek: 24.5,
            buffer: "+0%",
        };
    }, [months]);

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(16.5rem,0.82fr)] lg:gap-10">
            <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <p className="text-[14px] font-semibold text-white">
                        1 · How long do you have?
                    </p>
                    <p className="text-[12px] font-medium text-[#8B83A3]">
                        total course: 312 hrs
                    </p>
                </div>

                <div className="mt-3.5 grid grid-cols-4 gap-2.5">
                    {TIMELINES.map((item) => {
                        const active = months === item.months && days === "";
                        return (
                            <button
                                key={item.months}
                                type="button"
                                onClick={() => {
                                    setMonths(item.months);
                                    setDays("");
                                }}
                                className={active ? "modal-chip modal-chip-active" : "modal-chip"}
                            >
                                <span className="text-[22px] leading-none font-bold">
                                    {item.months}
                                </span>
                                <span
                                    className={`mt-1 text-[11px] font-medium ${active ? "text-white/85" : "text-[#8B83A3]"}`}
                                >
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="text-[11px] font-medium text-[#8B83A3]">
                        or enter days
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                </div>

                <label className="modal-field mt-3 flex items-center gap-3 px-4">
                    <input
                        value={days}
                        onChange={(event) => setDays(event.target.value.replace(/[^\d]/g, ""))}
                        placeholder="e.g. 45"
                        inputMode="numeric"
                        className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-white outline-none placeholder:text-[#6D6580]"
                    />
                    <span className="text-[13px] font-medium text-[#8B83A3]">days</span>
                </label>

                <div className="mt-7 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <p className="text-[14px] font-semibold text-white">
                        2 · Daily commitment
                    </p>
                    <p className="text-[12px] font-medium text-[#8B83A3]">
                        auto-set from your timeline — adjust if needed
                    </p>
                </div>

                <div className="mt-3.5 flex items-center gap-3.5">
                    <div className="modal-chip h-16 w-20 shrink-0">
                        <span className="text-[18px] leading-none font-bold">{hours}</span>
                        <span className="mt-1 text-[10px] font-medium text-[#8B83A3]">
                            hrs / day
                        </span>
                    </div>
                    <input
                        type="range"
                        min={0.5}
                        max={8}
                        step={0.5}
                        value={hours}
                        onChange={(event) => setHours(Number(event.target.value))}
                        className="modal-range"
                        style={{
                            ["--pct" as string]: `${((hours - 0.5) / 7.5) * 100}%`,
                        }}
                    />
                </div>

                <div className="mt-3.5 flex items-center gap-2.5">
                    <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                        {pace}
                    </span>
                    <p className="text-[12px] font-medium text-[#8B83A3]">{paceCopy}</p>
                </div>
            </div>

            <aside className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8B83A3] uppercase">
                    Roadmap completion by
                </p>
                <p className="mt-1.5 text-[32px] leading-none font-bold tracking-[-0.04em] text-white">
                    {stats.date}
                </p>
                <p className="mt-2 text-[12px] font-medium text-[#8B83A3]">
                    {stats.weeks} weeks · {stats.hours} hrs scheduled
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                    <div className="modal-stat">
                        <p className="text-[22px] leading-none font-bold text-white">
                            {stats.modules}
                        </p>
                        <p className="mt-1.5 text-[11px] font-medium text-[#8B83A3]">
                            modules / week
                        </p>
                    </div>
                    <div className="modal-stat">
                        <p className="text-[22px] leading-none font-bold text-white">
                            {stats.hoursWeek}
                        </p>
                        <p className="mt-1.5 text-[11px] font-medium text-[#8B83A3]">
                            hours / week
                        </p>
                    </div>
                    <div className="modal-stat">
                        <p className="text-[22px] leading-none font-bold text-white">
                            {stats.weeks}
                        </p>
                        <p className="mt-1.5 text-[11px] font-medium text-[#8B83A3]">
                            total weeks
                        </p>
                    </div>
                    <div className="modal-stat">
                        <p className="text-[22px] leading-none font-bold text-white">
                            {stats.buffer}
                        </p>
                        <p className="mt-1.5 text-[11px] font-medium text-[#8B83A3]">
                            schedule buffer
                        </p>
                    </div>
                </div>

                <button type="button" className="modal-cta mt-4">
                    <Sparkles size={16} strokeWidth={2} />
                    Unlock Premium
                </button>
                <p className="mt-3 text-[11px] leading-4.5 font-medium text-[#8B83A3]">
                    Custom study plans are a Premium feature — upgrade to activate your
                    schedule.
                </p>
            </aside>
        </div>
    );
}

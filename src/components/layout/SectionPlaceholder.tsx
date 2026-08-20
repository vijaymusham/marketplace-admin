"use client";

import { Calendar } from "lucide-react";
import Table, { type TableColumn } from "@/components/table/Table";
import TableHeader from "@/components/table/TableHeader";
import { StatusBadge } from "@/components/table/ColumnHelper";

const SAMPLE_SEEDS = [
    {
        date: "05-06-2026",
        day: "Friday",
        timeIn: "10:33:13",
        arrival: "Arrived Late",
        timeOut: "----",
        attendance: "----",
        remark: "Late",
    },
    {
        date: "04-06-2026",
        day: "Thursday",
        timeIn: "10:11",
        arrival: "Arrived On Time",
        timeOut: "19:03",
        attendance: "Left Early",
        remark: "Approve",
    },
    {
        date: "03-06-2026",
        day: "Wednesday",
        timeIn: "10:31:20",
        arrival: "Arrived Late",
        timeOut: "----",
        attendance: "----",
        remark: "Late",
    },
    {
        date: "02-06-2026",
        day: "Tuesday",
        timeIn: "10:17:37",
        arrival: "Arrived Late",
        timeOut: "19:01:59",
        attendance: "Left Early",
        remark: "Late EarlyLeave",
    },
    {
        date: "01-06-2026",
        day: "Monday",
        timeIn: "12:01:30",
        arrival: "Arrived Late",
        timeOut: "19:13:05",
        attendance: "Left Early",
        remark: "Late EarlyLeave",
    },
    {
        date: "25-05-2026",
        day: "Monday",
        timeIn: "15:50:30",
        arrival: "Arrived Late",
        timeOut: "19:08:40",
        attendance: "Worked Less than half day",
        remark: "Late HalfDay",
    },
    {
        date: "23-05-2026",
        day: "Saturday",
        timeIn: "10:45:47",
        arrival: "Arrived Late",
        timeOut: "19:16:50",
        attendance: "Left Early",
        remark: "Late EarlyLeave",
    },
    {
        date: "22-05-2026",
        day: "Friday",
        timeIn: "10:30:17",
        arrival: "Arrived Late",
        timeOut: "19:08:10",
        attendance: "Left Early",
        remark: "Late EarlyLeave",
    },
];

const SAMPLE_ROWS = Array.from({ length: 48 }, (_, index) => {
    const seed = SAMPLE_SEEDS[index % SAMPLE_SEEDS.length];
    return {
        ...seed,
        id: String(index + 1),
        date: seed.date.replace(/^\d{2}/, String(28 - (index % 27)).padStart(2, "0")),
    };
});

type SampleRow = (typeof SAMPLE_ROWS)[number];

const COLUMNS: TableColumn<SampleRow>[] = [
    { field: "date", header: "Date" },
    { field: "day", header: "Day" },
    { field: "timeIn", header: "Time In" },
    {
        field: "arrival",
        header: "Arrival Status",
        body: (row) => <StatusBadge status={row.arrival} />,
    },
    { field: "timeOut", header: "Time Out" },
    {
        field: "attendance",
        header: "Attendance",
        body: (row) => <StatusBadge status={row.attendance} />,
    },
    { field: "remark", header: "Remark" },
];

export default function SectionPlaceholder({ label }: { label: string }) {
    return (
        <div className="p-6">
            <TableHeader
                title={label}
                subtitle="Your records will appear here"
                icon={Calendar}
            />
            <div className="rounded-3xl  bg-[#1A1724]">
                <Table data={SAMPLE_ROWS} columns={COLUMNS} records={10} />
            </div>
        </div>
    );
}

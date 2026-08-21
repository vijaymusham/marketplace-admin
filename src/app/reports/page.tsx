"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import Table, { type TableColumn } from "@/components/table/Table";
import TableHeader from "@/components/table/TableHeader";
import { StatusBadge } from "@/components/table/ColumnHelper";
import { useQuery } from "@tanstack/react-query";
import { getReports } from "@/components/api/apis";
import { GetReportsParams, Report } from "@/components/types/type";
import GlowButton from "@/components/ui/GlowButton";
import { fieldClass } from "@/components/auth/LoginScreen";
import { useForm } from "react-hook-form";
import SelectDropdown from "@/components/helper/SelectDropdown";
import { formatStatus } from "@/components/helper/Helper";

const STATUS_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
];

const TARGET_TYPE_OPTIONS = [
    { value: "user", label: "User" },
    { value: "listing", label: "Listing" },
    { value: "message", label: "Message" },
    { value: "review", label: "Review" },
];

const COLUMNS: TableColumn<Report>[] = [
    { field: "reason", header: "Reason", body: (row) => row.reason.length > 20 ? row.reason.slice(0, 20) + "..." : row.reason },
    {
        field: "remarks",
        header: "Remarks",
        body: (row) => row.remarks.length > 20 ? row.remarks.slice(0, 20) + "..." : row.remarks,
    },
    { field: "targetType", header: "Target Type" },
    { field: "targetId", header: "Target ID" },
    { field: "reporter.firstName", header: "Reporter Name" },
    { field: "reporter.email", header: "Reporter Email" },
    { field: "reporter.phone", header: "Reporter Phone" },
    {
        field: "status",
        header: "Status",
        body: (row) => <StatusBadge status={formatStatus(row.status)} />,
    },
];

export default function ReportsPage() {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(20);
    const [filters, setFilters] = useState({ search: "", status: "", targetType: "" });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm<GetReportsParams>({
        defaultValues: { page: 1, limit: 20, search: "", targetType: "", status: "" },
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const status = watch("status") ?? "";
    const targetType = watch("targetType") ?? "";

    const { data, isLoading } = useQuery({
        queryKey: ["reports", page, records, filters.search, filters.status, filters.targetType],
        queryFn: () => getReports({ page, limit: records, search: filters.search, status: filters.status, targetType: filters.targetType }),
    });

    const totalPages = data?.data.totalPages ?? 1;

    const onSubmit = (form: GetReportsParams) => {
        setPage(1);
        setFilters({ search: form.search ?? "", status: form.status ?? "", targetType: form.targetType ?? "" });
    };

    return (
        <div className="p-6">
            <TableHeader
                title="Reports"
                subtitle="Your records will appear here"
                icon={Calendar}
                component={
                    <div>
                        <form
                            className="w-full flex items-center gap-2"
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <span className="sr-only">Search</span>
                                <input
                                    type="text"
                                    autoComplete="search"
                                    placeholder="Enter Your Search"
                                    className={`${fieldClass} w-58! bg-white/10! border-none! text-white!`}
                                    {...register("search")}
                                />
                            </div>
                            <div className="w-33 shrink-0 sm:mt-0.5 sm:w-48">
                                <SelectDropdown
                                    label=""
                                    value={status}
                                    onChange={(value) => setValue("status", value, { shouldDirty: true })}
                                    options={STATUS_OPTIONS}
                                    placeholder="Status"
                                    className={`${fieldClass} w-48! bg-white/10! border-none! text-white! rounded-xl! font-semibold! text-base!`}
                                />
                            </div>
                            <div className="w-33 shrink-0 sm:mt-0.5 sm:w-48">
                                <SelectDropdown
                                    label=""
                                    value={targetType}
                                    onChange={(value) => setValue("targetType", value, { shouldDirty: true })}
                                    options={TARGET_TYPE_OPTIONS}
                                    placeholder="Target Type"
                                    className={`${fieldClass} w-48! bg-white/10! border-none! text-white! rounded-xl! font-semibold! text-base!`}
                                />
                            </div>
                            <GlowButton
                                type="submit"
                                size="lg"
                                fullWidth
                                disabled={false}
                                className="min-h-12! rounded-xl!"
                            >
                                Search
                            </GlowButton>
                        </form>
                    </div>}
            />
            <div className="rounded-3xl bg-[#1A1724]">
                <Table
                    loading={isLoading}
                    data={data?.data.items ?? []}
                    columns={COLUMNS}
                    records={records}
                    pageNo={page}
                    totalRecord={data?.data.total ?? 0}
                    prevIsValid={page > 1}
                    nextIsValid={page < totalPages}
                    pageChangeHandler={setPage}
                    onRecordsChange={setRecords}
                />
            </div>
        </div>
    );
}

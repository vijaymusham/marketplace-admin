"use client";

import { Users } from "lucide-react";
import Table, { type TableColumn } from "@/components/table/Table";
import TableHeader from "@/components/table/TableHeader";
import { StatusBadge } from "@/components/table/ColumnHelper";
import { getUsers } from "@/components/api/apis";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GetUsersParams, GetUsersResponse } from "@/components/types/type";
import { fieldClass } from "@/components/auth/LoginScreen";
import SelectDropdown from "@/components/helper/SelectDropdown";
import GlowButton from "@/components/ui/GlowButton";
import Image from "next/image";

type User = NonNullable<GetUsersResponse["items"]>[number];

const STATUS_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
];

const COLUMNS: TableColumn<User>[] = [
    { field: "profilePhoto", header: "Profile", body: (row) => <Image src={row.profilePhoto} alt={row.firstName} width={100} height={100} className="w-10 h-10 rounded-full object-cover" /> },
    { field: "id", header: "ID", body: (row) => row.id.slice(0, 10) + "..." || "N/A" },
    { field: "firstName", header: "First Name", body: (row) => row.firstName.charAt(0).toUpperCase() + row.firstName.slice(1) },
    { field: "lastName", header: "Last Name", body: (row) => row.lastName.charAt(0).toUpperCase() + row.lastName.slice(1) },
    { field: "email", header: "Email", body: (row) => row.email ? row.email : "N/A" },
    { field: "phone", header: "Phone", body: (row) => row.phone ? row.phone : "N/A" },
    { field: "lastActiveAt", header: "Last Active At", body: (row) => row.lastActiveAt ? new Date(row.lastActiveAt).toLocaleString() : "N/A" },
    { field: "status", header: "Status", body: (row) => <StatusBadge status={row.status} /> },
    { field: "role", header: "Role" },
];

export default function UsersPage() {

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(20);
    const [filters, setFilters] = useState({ search: "", status: "" });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm<GetUsersParams>({
        defaultValues: { page: 1, limit: 20, search: "", status: "" },
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const status = watch("status") ?? "";

    const { data, isLoading } = useQuery({
        queryKey: ["users", page, records, filters.search, filters.status],
        queryFn: () => getUsers({ page, limit: records, search: filters.search, status: filters.status }),
    });


    const onSubmit = (form: GetUsersParams) => {
        setPage(1);
        setFilters({ search: form.search ?? "", status: form.status ?? "" });
    };

    return (
        <div className="p-6">
            <TableHeader
                title="Users"
                subtitle="All users will appear here"
                icon={Users}
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
                    nextIsValid={page < (data?.data.totalPages ?? 0)}
                    pageChangeHandler={setPage}
                    onRecordsChange={setRecords}
                />
            </div>
        </div>
    );
}

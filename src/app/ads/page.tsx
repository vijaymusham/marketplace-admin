"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import Table, { type TableColumn } from "@/components/table/Table";
import TableHeader from "@/components/table/TableHeader";
import { StatusBadge } from "@/components/table/ColumnHelper";
import { useQuery } from "@tanstack/react-query";
import { getAds } from "@/components/api/apis";
import { GetAdsParams, type AdItem } from "@/components/types/type";
import GlowButton from "@/components/ui/GlowButton";
import { fieldClass } from "@/components/auth/LoginScreen";
import { useForm } from "react-hook-form";
import SelectDropdown from "@/components/helper/SelectDropdown";
import { formatPrice, formatStatus } from "@/components/helper/Helper";

const STATUS_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
];

const COLUMNS: TableColumn<AdItem>[] = [
    { field: "title", header: "Title", body: (row) => row.title.length > 20 ? row.title.slice(0, 20) + "..." : row.title },
    {
        field: "price",
        header: "Price",
        body: (row) => formatPrice(row.price),
    },
    { field: "category.name", header: "Category" },
    { field: "subCategory.name", header: "Sub Category" },
    { field: "state.name", header: "State" },
    { field: "city.name", header: "City" },
    { field: "sellerName", header: "Seller Name" },
    { field: "mobileNumber", header: "Mobile Number" },
    {
        field: "status",
        header: "Status",
        body: (row) => <StatusBadge status={formatStatus(row.status)} />,
    },
];

export default function AdsPage() {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(20);
    const [filters, setFilters] = useState({ search: "", status: "" });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm<GetAdsParams>({
        defaultValues: { page: 1, limit: 20, search: "", categoryId: "", subCategoryId: "", status: "" },
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const status = watch("status") ?? "";

    const { data, isLoading } = useQuery({
        queryKey: ["ads", page, records, filters.search, filters.status],
        queryFn: () => getAds({ page, limit: records, search: filters.search, status: filters.status }),
    });

    const totalPages = data?.totalPages ?? 1;

    const onSubmit = (form: GetAdsParams) => {
        setPage(1);
        setFilters({ search: form.search ?? "", status: form.status ?? "" });
    };

    return (
        <div className="p-6">
            <TableHeader
                title="Ads"
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
                    data={data?.items ?? []}
                    columns={COLUMNS}
                    records={records}
                    pageNo={page}
                    totalRecord={data?.total ?? 0}
                    prevIsValid={page > 1}
                    nextIsValid={page < totalPages}
                    pageChangeHandler={setPage}
                    onRecordsChange={setRecords}
                />
            </div>
        </div>
    );
}

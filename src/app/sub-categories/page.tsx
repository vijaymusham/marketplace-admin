"use client";

import { Calendar } from "lucide-react";
import Table, { type TableColumn } from "@/components/table/Table";
import TableHeader from "@/components/table/TableHeader";
import { StatusBadge } from "@/components/table/ColumnHelper";
import { useState } from "react";
import { getCategories, getSubCategories } from "@/components/api/apis";
import { useQuery } from "@tanstack/react-query";
import { GetSubCategoriesParams, SubCategory } from "@/components/types/type";
import { fieldClass } from "@/components/auth/LoginScreen";
import GlowButton from "@/components/ui/GlowButton";
import { useForm } from "react-hook-form";
import SelectDropdown from "@/components/helper/SelectDropdown";


const COLUMNS: TableColumn<SubCategory>[] = [
    { field: "id", header: "ID", body: (row) => row.id.slice(0, 10) + "..." || "N/A" },
    { field: "name", header: "Name", body: (row) => row.name.charAt(0).toUpperCase() + row.name.slice(1) },
    { field: "categoryName", header: "Category Name", body: (row) => row.categoryName.charAt(0).toUpperCase() + row.categoryName.slice(1) },
    { field: "slug", header: "Slug", body: (row) => row.slug },
    { field: "sortOrder", header: "Sort Order", body: (row) => row.sortOrder },
    { field: "isActive", header: "Status", body: (row) => <StatusBadge status={row.isActive ? "Active" : "Inactive"} /> },
];

export default function SubCategoriesPage() {

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(20);
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories({ page: 1, limit: 20 }),
    });

    const { handleSubmit, setValue } = useForm<GetSubCategoriesParams>({
        defaultValues: {
            categoryId: undefined
        },
    });

    const onSubmit = (data: GetSubCategoriesParams) => {
        setPage(data.page ?? 1);
        setRecords(data.limit ?? 20);
        setCategoryId(data.categoryId ?? undefined);
    };

    const { data, isLoading } = useQuery({
        queryKey: ["sub-categories", page, records, categoryId ?? undefined],
        queryFn: () => getSubCategories({ page: page, limit: records, categoryId: categoryId ?? undefined }),
    });


    return (
        <div className="p-6">
            <TableHeader
                title="Sub Categories"
                subtitle="Your records will appear here"
                icon={Calendar}
                component={
                    <div>
                        <form
                            className="w-full flex items-center gap-2"
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="w-33 shrink-0 sm:mt-0.5 sm:w-48">
                                <SelectDropdown
                                    label=""
                                    value={categoryId ?? ""}
                                    onChange={(value) => {
                                        setValue("categoryId", value, { shouldDirty: true });
                                    }}
                                    options={categories?.data.items.map((category) => ({ label: category.name, value: category.id })) ?? []}
                                    placeholder="Category"
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

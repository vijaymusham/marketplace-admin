"use client";

import { Calendar } from "lucide-react";
import Table, { type TableColumn } from "@/components/table/Table";
import TableHeader from "@/components/table/TableHeader";
import { StatusBadge } from "@/components/table/ColumnHelper";
import { getCategories } from "@/components/api/apis";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/components/types/type";


const COLUMNS: TableColumn<Category>[] = [
    { field: "id", header: "ID", body: (row) => row.id.slice(0, 10) + "..." || "N/A" },
    { field: "name", header: "Name", body: (row) => row.name.charAt(0).toUpperCase() + row.name.slice(1) },
    { field: "slug", header: "Slug", body: (row) => row.slug },
    { field: "sortOrder", header: "Sort Order", body: (row) => row.sortOrder },
    { field: "isActive", header: "Status", body: (row) => <StatusBadge status={row.isActive ? "Active" : "Inactive"} /> },
];


export default function CategoriesPage() {

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<number>(20);

    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories({ page, limit: records }),
    });

    return (
        <div className="p-6">
            <TableHeader
                title="Categories"
                subtitle="Your records will appear here"
                icon={Calendar}
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

"use client";;
import { useState } from "react";
import { Calendar } from "lucide-react";
import Table, { type TableColumn } from "@/components/table/Table";
import TableHeader from "@/components/table/TableHeader";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/components/api/apis";
import { City, GetCitiesParams } from "@/components/types/type";
import { useForm } from "react-hook-form";


const COLUMNS: TableColumn<City>[] = [
    { field: "name", header: "Name" },
    { field: "state", header: "State" },
    { field: "code", header: "Code" },
    { field: "isActive", header: "Active", body: (row) => row.isActive ? "Yes" : "No" },
];

export default function CitiesPage() {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(20);

    const {
    } = useForm<GetCitiesParams>({
        defaultValues: { page: 1, limit: 20, search: "" },
    });

    const { data, isLoading } = useQuery({
        queryKey: ["cities", page, records],
        queryFn: () => getCities({ page, limit: records }),
    });

    const totalPages = data?.data.totalPages ?? 1;

    return (
        <div className="p-6">
            <TableHeader
                title="Cities"
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
                    nextIsValid={page < totalPages}
                    pageChangeHandler={setPage}
                    onRecordsChange={setRecords}
                />
            </div>
        </div>
    );
}

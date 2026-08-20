"use client";

import {
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type MouseEvent,
    type ReactNode,
    type WheelEvent,
} from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

export const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

export type TableColumn<T> = {
    id?: string;
    field?: string;
    header: ReactNode;
    body?: (row: T) => ReactNode;
    style?: CSSProperties;
    sortable?: boolean;
};

type SortDirection = "asc" | "desc" | null;

type TableProps<T> = {
    data?: T[];
    columns?: TableColumn<T>[];
    paginator?: boolean;
    pageNo?: number;
    totalRecord?: number;
    records?: number;
    rowsPerPageOptions?: readonly number[];
    prevIsValid?: boolean;
    nextIsValid?: boolean;
    pageChangeHandler?: (page: number) => void;
    onRecordsChange?: (records: number) => void;
    loading?: boolean;
    children?: ReactNode;
};

function SortGlyph({ direction }: { direction: SortDirection }) {
    return (
        <span className="ml-1.5 inline-flex flex-col leading-none" aria-hidden>
            <ChevronUp
                size={10}
                strokeWidth={2.75}
                className={direction === "asc" ? "opacity-100" : "opacity-35"}
            />
            <ChevronDown
                size={10}
                strokeWidth={2.75}
                className={`-mt-0.5 ${direction === "desc" ? "opacity-100" : "opacity-35"}`}
            />
        </span>
    );
}

function readCell<T>(row: T, field?: string) {
    if (!field) return "";
    return field.split(".").reduce<unknown>((value, key) => {
        if (value && typeof value === "object" && key in value) {
            return (value as Record<string, unknown>)[key];
        }
        return undefined;
    }, row);
}

function Table<T extends { id?: string | number }>({
    data = [],
    columns = [],
    paginator = true,
    pageNo: controlledPage,
    totalRecord,
    records = 10,
    rowsPerPageOptions = PAGE_SIZE_OPTIONS,
    prevIsValid,
    nextIsValid,
    pageChangeHandler,
    onRecordsChange,
    loading = false,
    children,
}: TableProps<T>) {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const dragStateRef = useRef({
        isDragging: false,
        startX: 0,
        scrollLeft: 0,
    });
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortDirection>(null);
    const [internalPage, setInternalPage] = useState(1);
    const [internalRecords, setInternalRecords] = useState(records);

    const isPageControlled = typeof pageChangeHandler === "function";
    const isSizeControlled = typeof onRecordsChange === "function";
    const pageNo = isPageControlled ? (controlledPage ?? 1) : internalPage;
    const pageSize = isSizeControlled ? records : internalRecords;

    const sortedData = useMemo(() => {
        if (!sortField || !sortOrder) return data;

        return [...data].sort((a, b) => {
            const left = readCell(a, sortField);
            const right = readCell(b, sortField);
            const leftValue = left == null ? "" : String(left).toLowerCase();
            const rightValue = right == null ? "" : String(right).toLowerCase();
            if (leftValue < rightValue) return sortOrder === "asc" ? -1 : 1;
            if (leftValue > rightValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortField, sortOrder]);

    const pagedData = useMemo(() => {
        if (isPageControlled) return sortedData;
        const start = (pageNo - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [isPageControlled, pageNo, pageSize, sortedData]);

    const total = totalRecord ?? data.length;
    const pageCount = Math.max(1, Math.ceil(total / pageSize) || 1);
    const canPrev = isPageControlled ? Boolean(prevIsValid) : pageNo > 1;
    const canNext = isPageControlled ? Boolean(nextIsValid) : pageNo < pageCount;

    const toggleSort = (field?: string, sortable = true) => {
        if (!sortable || !field) return;
        if (sortField !== field) {
            setSortField(field);
            setSortOrder("asc");
            return;
        }
        if (sortOrder === "asc") {
            setSortOrder("desc");
            return;
        }
        setSortField(null);
        setSortOrder(null);
    };

    const goToPage = (nextPage: number) => {
        if (isPageControlled) {
            pageChangeHandler?.(nextPage);
            return;
        }
        setInternalPage(nextPage);
    };

    const changeRecords = (nextSize: number) => {
        if (isSizeControlled) {
            onRecordsChange?.(nextSize);
        } else {
            setInternalRecords(nextSize);
        }
        goToPage(1);
    };

    const handleTableWheel = (event: WheelEvent<HTMLDivElement>) => {
        const tableWrapper = tableContainerRef.current;
        if (!tableWrapper) return;
        if (tableWrapper.scrollWidth <= tableWrapper.clientWidth) return;
        if (!event.shiftKey) return;
        tableWrapper.scrollLeft += event.deltaY;
        event.preventDefault();
    };

    const handleTableMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        const tableWrapper = tableContainerRef.current;
        if (!tableWrapper) return;
        if (tableWrapper.scrollWidth <= tableWrapper.clientWidth) return;
        if (
            event.target instanceof Element &&
            event.target.closest("button, a, input, textarea, select, label")
        ) {
            return;
        }
        dragStateRef.current.isDragging = true;
        dragStateRef.current.startX = event.clientX;
        dragStateRef.current.scrollLeft = tableWrapper.scrollLeft;
    };

    const handleTableMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const tableWrapper = tableContainerRef.current;
        if (!tableWrapper || !dragStateRef.current.isDragging) return;
        tableWrapper.scrollLeft =
            dragStateRef.current.scrollLeft - (event.clientX - dragStateRef.current.startX);
        event.preventDefault();
    };

    const stopTableDragging = () => {
        dragStateRef.current.isDragging = false;
    };

    return (
        <div>
            {children}
            <div className="p-4">
                <div
                    ref={tableContainerRef}
                    onWheel={handleTableWheel}
                    onMouseDown={handleTableMouseDown}
                    onMouseMove={handleTableMouseMove}
                    onMouseUp={stopTableDragging}
                    onMouseLeave={stopTableDragging}
                    className="dp-table-wrap overflow-x-auto"
                >
                    <table className="dp-table">
                        <thead>
                            <tr>
                                {columns.map((col) => {
                                    const field = col.field ?? col.id;
                                    const sortable = col.sortable !== false;
                                    const active = sortField === field ? sortOrder : null;

                                    return (
                                        <th
                                            key={String(field ?? col.header)}
                                            style={col.style}
                                            aria-sort={
                                                active === "asc"
                                                    ? "ascending"
                                                    : active === "desc"
                                                        ? "descending"
                                                        : "none"
                                            }
                                        >
                                            {sortable ? (
                                                <button
                                                    type="button"
                                                    className="dp-table-sort"
                                                    onClick={() => toggleSort(field, sortable)}
                                                >
                                                    {col.header}
                                                    <SortGlyph direction={active} />
                                                </button>
                                            ) : (
                                                <span className="dp-table-sort">
                                                    {col.header}
                                                </span>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={Math.max(columns.length, 1)}>
                                        <p className="py-6 text-center text-sm font-semibold text-[#8B83A3]">
                                            Loading
                                        </p>
                                    </td>
                                </tr>
                            ) : pagedData.length === 0 ? (
                                <tr>
                                    <td colSpan={Math.max(columns.length, 1)}>
                                        <p className="py-6 text-center text-sm font-medium text-[#8B83A3]">
                                            Data not found!
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                pagedData.map((row, index) => (
                                    <tr key={row?.id ?? `${pageNo}-${index}`}>
                                        {columns.map((col) => {
                                            const field = col.field ?? col.id;
                                            const content = col.body
                                                ? col.body(row)
                                                : (readCell(row, field) ?? "----");

                                            return (
                                                <td
                                                    key={String(field ?? col.header)}
                                                    style={col.style}
                                                >
                                                    {content as ReactNode}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {paginator && (
                <div className="flex items-center justify-end gap-2 px-6 py-3">
                    <button
                        type="button"
                        aria-label="Previous page"
                        onClick={() => goToPage(pageNo - 1)}
                        disabled={!canPrev}
                        className="grid size-8 place-items-center rounded-lg text-[#D6D0E8] transition-colors hover:bg-white/8 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        type="button"
                        aria-label="Next page"
                        onClick={() => goToPage(pageNo + 1)}
                        disabled={!canNext}
                        className="grid size-8 place-items-center rounded-lg text-[#D6D0E8] transition-colors hover:bg-white/8 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRight size={18} />
                    </button>
                    <label className="relative ml-1 inline-flex items-center">
                        <span className="sr-only">Rows per page</span>
                        <select
                            className="dp-page-size"
                            value={pageSize}
                            onChange={(event) => changeRecords(Number(event.target.value))}
                        >
                            {rowsPerPageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            size={14}
                            className="pointer-events-none absolute right-2.5 text-[#9A92B3]"
                        />
                    </label>
                </div>
            )}
        </div>
    );
}

export default Table;

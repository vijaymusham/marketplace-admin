'use client'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import { ChevronLeft } from '@hugeicons/core-free-icons';
import { ChevronRight } from '@hugeicons/core-free-icons';

function Table({ data, columns, paginator = true, pageNo, totalRecord, records = 1, prevIsValid, nextIsValid, pageChangeHandler }) {
    const [loading, setLoading] = useState(true);
    const tableContainerRef = useRef(null);
    const dragStateRef = useRef({
        isDragging: false,
        startX: 0,
        scrollLeft: 0,
    });

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [data]);



    const handleTableWheel = (event) => {
        const tableWrapper = tableContainerRef.current?.querySelector('.p-datatable-wrapper');
        if (!tableWrapper) return;

        const hasHorizontalOverflow = tableWrapper.scrollWidth > tableWrapper.clientWidth;
        if (!hasHorizontalOverflow) return;

        if (event.shiftKey) {
            tableWrapper.scrollLeft += event.deltaY;
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleTableMouseDown = (event) => {
        const tableWrapper = tableContainerRef.current?.querySelector('.p-datatable-wrapper');
        if (!tableWrapper) return;

        const hasHorizontalOverflow = tableWrapper.scrollWidth > tableWrapper.clientWidth;
        if (!hasHorizontalOverflow) return;

        if (event.target.closest('button, a, input, textarea, select, label')) return;

        dragStateRef.current.isDragging = true;
        dragStateRef.current.startX = event.clientX;
        dragStateRef.current.scrollLeft = tableWrapper.scrollLeft;
    };

    const handleTableMouseMove = (event) => {
        const tableWrapper = tableContainerRef.current?.querySelector('.p-datatable-wrapper');
        if (!tableWrapper || !dragStateRef.current.isDragging) return;

        const deltaX = event.clientX - dragStateRef.current.startX;
        tableWrapper.scrollLeft = dragStateRef.current.scrollLeft - deltaX;
        event.preventDefault();
    };

    const stopTableDragging = () => {
        dragStateRef.current.isDragging = false;
    };


    return (
        <>
            <div
                ref={tableContainerRef}
                onWheel={handleTableWheel}
                onMouseDown={handleTableMouseDown}
                onMouseMove={handleTableMouseMove}
                onMouseUp={stopTableDragging}
                onMouseLeave={stopTableDragging}
            >
                <DataTable
                    value={data}
                    emptyMessage={
                        loading ?
                            <h6
                                className={"font-int py-2.5 text-base font-semibold leading-6 text-slate-500 flex justify-center items-center w-full"}
                            >
                                Loading
                            </h6> :
                            <h6 className='text-xs md:text-sm w-full font-int font-medium  text-slate-600 md:text-center py-4'>
                                Data not found!
                            </h6>
                    }
                    lazy
                    stripedRows
                    resizableColumns
                    rows={25}
                    className="font-int"
                    rowsPerPageOptions={[25, 50, 100]}
                    sortMode="multiple"
                >
                    {columns?.map((col) => (
                        <Column key={col?.field ?? col?.id} field={col?.field} header={<h3 className="font-semibold transition-colors bg-primary text-xs uppercase font-axiforma tracking-wide">{col?.header}</h3>} body={col?.body} style={col?.style ? col?.style : { width: '100%' }} className='font-int' />
                    ))}
                </DataTable>
            </div>
            {paginator && <div className="flex justify-center md:justify-end items-center gap-4 mt-5 lg:my-0 my-5 lg:mt-5">
                <button
                    onClick={() => pageChangeHandler(pageNo - 1)}
                    disabled={!prevIsValid}
                    className="cursor-pointer p-0.5 rounded-md transition-all duration-300 bg-slate-200  hover:bg-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Icon icon={ChevronLeft} size={20} className="text-black group-hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" />
                </button>
                <div className="relative">
                    <h4 className='font-int text-sm'>Page {pageNo} of {Math.ceil(totalRecord / records) || 1}</h4>
                </div>
                <button
                    onClick={() => pageChangeHandler(pageNo + 1)}
                    disabled={!nextIsValid}
                    className="cursor-pointer p-0.5 rounded-md transition-all duration-300 bg-slate-200  hover:bg-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Icon icon={ChevronRight} size={20} className="text-black group-hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" />
                </button>
            </div>}
        </>
    );
}

export default Table;

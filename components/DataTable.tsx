"use client"
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from './ui/empty';
import { FolderOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Interface générique pour les props
interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    perPage?: number;
}

export function DataTable<TData>({
    columns,
    data,
    perPage = 5
}: DataTableProps<TData>) {

    const t = useTranslations('datatable')

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: perPage,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: Math.ceil(data.length / pagination.pageSize),
        manualPagination: false,
    });

    return (
        <div className="space-y-4">
            {/* Tableau */}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-center">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-center">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <Empty>
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon">
                                                <FolderOpen />
                                            </EmptyMedia>
                                            <EmptyTitle>{t('noResultYet')}</EmptyTitle>
                                        </EmptyHeader>
                                    </Empty>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                        Page {table.getState().pagination.pageIndex + 1} {t('of')}{" "}
                        {table.getPageCount()}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                        Total: {data.length} elements
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {t('previous')}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {t('next')}
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{t('rowsPerPage')}:</span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Si "all" est sélectionné, définir la taille de page sur la longueur totale des données
                            if (value === "all") {
                                table.setPageSize(data.length);
                            } else {
                                table.setPageSize(Number(value));
                            }
                        }}
                        className="border rounded p-1 text-sm"
                    >
                        {[3, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>

                        ))}
                        <option key="all" value="all">
                            {t('all')}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
}
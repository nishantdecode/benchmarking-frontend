"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BsFiletypeXls } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { downloadSheet } from "@/util/exportUtils";

export function VisualiseTable({
  columns,
  data,
  search,
  exportXls,
  navigate,
  title,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.split("/")[pathname.split("/").length - 1];
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-4">
        {title && <div className="flex justify-center lg:justify-start w-full">{title}</div>}
        <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:justify-end gap-4">
          {search && (
            <div className="flex flex-col sm:flex-row items-center justify-end w-full sm:w-auto gap-2">
              <Input
                placeholder="Filter data by category..."
                value={table.getColumn("category")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table
                    .getColumn("category")
                    ?.setFilterValue(event.target.value)
                }
              />
            </div>
          )}
          {exportXls && (
            <div className="flex flex-row w-auto gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="flex justify-between w-auto gap-2 text-xs"
                  >
                    <div className="flex flex-row gap-2">Export as</div>
                    <IoIosArrowDown
                      size={16}
                      className="flex dark:text-primary"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuRadioGroup
                    value=""
                    onValueChange={(v) => {}}
                    className="flex flex-col gap-2"
                  >
                    <DropdownMenuItem
                      value="xls"
                      onClick={() =>
                        downloadSheet(data, "Sheet Name", "File Name")
                      }
                    >
                      <div className="flex flex-row justify-start gap-2">
                        <BsFiletypeXls size={15} className="mt-0.5" />
                        <div>Export as XLS</div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {navigate && (
                <Button
                  variant="default"
                  className="flex py-0 text-xs justify-center w-auto"
                  onClick={() =>
                    page === "singleBank"
                      ? router.push("/size/multiBank")
                      : router.push("/size/singleBank")
                  }
                >
                  {page === "singleBank" ? "Compare Banks" : "Individual Banks"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${index === 0 ? "border-r-[1px]" : ""}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={`${
                        index === 0 ? "bg-secondary border-r-[1px]" : ""
                      }`}
                    >
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

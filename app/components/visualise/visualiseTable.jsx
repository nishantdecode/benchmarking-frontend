"use client";

import React from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
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
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BsFiletypeXls } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { downloadSheet } from "@/util/exportUtils";
import DateRangeSelector from "../dateRangeSelector";


const numberToLocalDigitsConvertor= (data) => {
  let result = []
  for (let obj of data){
    let demoObj = {}
    Object.entries(obj).map(([key,value])=>{
        demoObj[key] = value.toLocaleString()
      
    })
    result.push(demoObj)
  }
  return result
}
export function VisualiseTable({
  data,
  title,
  width,
  search,
  columns,
  navigate,
  fileName,
  years,
  figureDate,
  setFigureDate,
  exportXls,
  sheetNames,
  value = null,
  exportData = [],
}) {
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.split("/")[pathname.split("/").length - 1];
  const banks = useSelector((state) => state.bank.banks);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  // console.log({data})
  // const realData = numberToLocalDigitsConvertor(data) || [];
  const realData = data
  console.log({realData})
  const table = useReactTable({
    data:realData,
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
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-4">
        {title && (
          <span className="hidden lg:flex justify-center lg:justify-start w-full text-sm">
            {title}
          </span>
        )}
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
          {years && <div>
            <DateRangeSelector years={years} date={figureDate} setDate={setFigureDate} />
          </div>}
          {exportXls && (
            <div className="flex flex-row w-auto gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex justify-between w-auto gap-2 text-xs"
                  >
                    <div className="flex flex-row gap-2 text-primary font-bold">
                      Export as
                    </div>
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
                        downloadSheet(
                          banks,
                          value,
                          fileName,
                          sheetNames,
                          exportData
                        )
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
                  size="sm"
                  variant="default"
                  className="flex py-0 text-xs justify-center w-auto"
                  onClick={() =>
                    page === "singleBank"
                      ? router.push("/dashboard/size/multiBank")
                      : router.push("/dashboard/size/singleBank")
                  }
                >
                  {page === "singleBank" ? "Compare Banks" : "Individual Banks"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="relative max-h-[500px] lg:max-h-[650px] rounded-md border overflow-scroll">
        <Table>
          <TableHeader className=" ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="sticky  top-0 bg-secondary z-20 ">
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${index === 0 ? "border-r-[1px] hover:opacity-100 bg-secondary sticky left-0" : ""}`}
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
          <TableBody style={{ width: `${width}px`, maxHeight: "650px" }}>
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
                        index === 0 ? "bg-secondary border-r-[1px] sticky left-0 z-10" : ""
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

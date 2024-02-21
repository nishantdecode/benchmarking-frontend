import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function Pagination({ table }) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="hidden sm:flex flex-1 text-sm text-muted-foreground">
        Row {table.getState().pagination.pageIndex * table.getState().pagination.pageSize} to{" "}
        {(table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize} displayed.
      </div>
      <div className="flex items-center space-x-2 sm:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden sm:flex text-xs sm:text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-xs sm:text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 pl-2 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <MdKeyboardDoubleArrowLeft className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 pl-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <MdKeyboardArrowLeft className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 pl-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <MdKeyboardArrowRight className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 pl-2 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <MdKeyboardDoubleArrowRight className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}

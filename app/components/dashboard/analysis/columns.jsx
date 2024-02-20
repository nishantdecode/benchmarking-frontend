"use client";

import { ColumnDef } from "@tanstack/react-table";
import { tableColData } from "@/app/data/dashboardData";
import { PiBankBold } from "react-icons/pi";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const bankCol = ({ key }) => {
  return {
    accessorKey: "bank",
    header: <div className="text-center font-bold min-w-[150px]"> </div>,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue(key)}</div>;
    },
  };
};

const yearCol = ({ key }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-center font-bold min-w-[150px] gap-2">
          {/* <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs sm:text-md gap-1"
          > */}
          <PiBankBold className="text-md mt-0.5 sm:text-[16px] sm:mt-0.5" />
          {key}
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
          {/* </Button> */}
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue(key)}</div>;
    },
  };
};

export const columns = Object.keys(tableColData[0])
  .filter((key) => key !== "id")
  .reverse()
  .map((accessorKey) => {
    if (accessorKey === "bank") {
      return bankCol({ key: accessorKey });
    } else {
      return yearCol({ key: accessorKey });
    }
  });

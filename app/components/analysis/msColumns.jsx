"use client";

import { msBalanceSheetData } from "@/app/data/analysis";
import { Progress } from "@/components/ui/progress";
import { PiBankBold } from "react-icons/pi";

const bankCol = ({ key }) => {
  return {
    accessorKey: "bank",
    header: <div className="text-center font-bold min-w-[150px]"> </div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-row justify-start font-bold min-w-[150px] gap-2">
          <PiBankBold className="text-md mt-0.5 sm:text-[16px] sm:mt-0.5" />
          <div className="text-left font-medium">{row.getValue(key)}</div>
        </div>
      );
    },
  };
};

const yearCol = ({ key }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-between pl-2 pr-6 font-bold min-w-[200px] gap-2">
          {key}
          <div>Market Share</div>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-5 justify-center">
            <div className="text-center font-medium">{row.getValue(key).value}</div>
            <Progress value={row.getValue(key).share} className="w-[140px]">{row.getValue(key).share}</Progress>
        </div>
      );
    },
  };
};

export const msColumns = Object.keys(msBalanceSheetData[0])
  .filter((key) => key !== "id")
  .reverse()
  .map((accessorKey) => {
    if (accessorKey === "bank") {
      return bankCol({ key: accessorKey });
    } else {
      return yearCol({ key: accessorKey });
    }
  });

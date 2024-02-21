"use client";

import { individualBankMarketData } from "@/app/data/marketShareData";
import { Progress } from "@/components/ui/progress";

const yearCol = ({ key }) => {
  return {
    accessorKey: key,
    header: <div key={key} className="text-center font-bold min-w-[80px]"> </div>,
    cell: ({ row }) => {
      return <div key={key} className="text-left font-medium">{row.getValue(key)}</div>;
    },
  };
};

const categoryCol = ({ key }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div key={key} className="flex flex-row justify-center overflow-hidden font-bold w-[150px] gap-2">
          {key}
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div key={key} className="flex flex-row w-full">
          <Progress value={row.getValue(key)}>{row.getValue(key)}</Progress>
        </div>
      );
    },
  };
};

export const columns = Object.keys(individualBankMarketData[0])
  .filter((key) => key !== "id")
  .map((accessorKey) => {
    if (accessorKey === "year") {
      return yearCol({ key: accessorKey });
    } else {
      return categoryCol({ key: accessorKey });
    }
  });

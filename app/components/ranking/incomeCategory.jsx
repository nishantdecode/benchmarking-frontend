"use client";

import { incomeStatmentCategories } from "@/app/data/rankingData";
import { PiBankBold } from "react-icons/pi";

const bankCol = ({ key }) => {
  return {
    accessorKey: "rank",
    header: <div key={key} className="text-center font-bold min-w-[150px]"> </div>,
    cell: ({ row }) => {
      return <div key={key} className="text-left font-medium">{row.getValue(key)}</div>;
    },
  };
};

const yearCol = ({ key }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div key={key} className="flex flex-row justify-center font-bold min-w-[150px] gap-2">
          {key}
        </div>
      );
    },
    cell: ({ row }) => {
      return <div key={key} className="flex flex-row justify-center gap-2 text-center font-medium"><PiBankBold className="text-md mt-0.5 sm:text-[16px] sm:mt-0.5" />{row.getValue(key)}</div>;
    },
  };
};

export const columns = Object.keys(incomeStatmentCategories[0])
  .filter((key) => key !== "id")
  .reverse()
  .map((accessorKey) => {
    if (accessorKey === "rank") {
      return bankCol({ key: accessorKey });
    } else {
      return yearCol({ key: accessorKey });
    }
  });

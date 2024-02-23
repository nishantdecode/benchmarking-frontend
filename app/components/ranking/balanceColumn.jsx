"use client";

import { balanceSheetData } from "@/app/data/rankingData";
import { PiBankBold } from "react-icons/pi";

const bankCol = ({ key }) => {
  return {
    accessorKey: "rank",
    header: <div key={key} className="text-center font-bold min-w-[150px]"> </div>,
    cell: ({ row }) => {
      return <div key={key} className="text-left font-medium">{row.getValue(key) === '1' ? "1st Rank" : row.getValue(key) === '2' ? "2nd Rank" : row.getValue(key) === '3' ? "3rd Rank" : `${row.getValue(key)}th Rank`}</div>;
    },
  };
};

const yearCol = ({ key }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div key={key} className="flex flex-row justify-start pl-5 font-bold min-w-[220px] gap-2">
          {key}
        </div>
      );
    },
    cell: ({ row }) => {
      return <div key={key} className="flex flex-row justify-start gap-2 text-center font-medium pl-5"><PiBankBold className="text-md mt-0.5 sm:text-[16px] sm:mt-0.5" />{row.getValue(key)}</div>;
    },
  };
};

export const columns = Object.keys(balanceSheetData[0])
  .filter((key) => key !== "id")
  .reverse()
  .map((accessorKey) => {
    if (accessorKey === "rank") {
      return bankCol({ key: accessorKey });
    } else {
      return yearCol({ key: accessorKey });
    }
  });


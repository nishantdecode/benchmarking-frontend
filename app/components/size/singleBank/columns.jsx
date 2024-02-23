"use client";

import {
  assetData,
  equityData,
  expenseData,
  incomeData,
  liabilityData,
} from "@/app/data/sizeData";
import { Progress } from "@/components/ui/progress";

const yearCol = ({ key }) => {
  return {
    accessorKey: key,
    header: <div className="text-center font-bold min-w-[80px]"> </div>,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue(key)}</div>;
    },
  };
};

const categoryCol = ({ key }) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <div className="flex flex-row justify-center overflow-hidden font-bold w-[150px] gap-2">
          {key}
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row w-full">
          <Progress value={parseInt(row.getValue(key))}>
            {row.getValue(key)}
          </Progress>
        </div>
      );
    },
  };
};

export const expenseColumns = Object.keys(expenseData[0])
  .filter((key) => key !== "id")
  .map((accessorKey) => {
    if (accessorKey === "year") {
      return yearCol({ key: accessorKey });
    } else {
      return categoryCol({ key: accessorKey });
    }
  });

export const incomeColumns = Object.keys(incomeData[0])
  .filter((key) => key !== "id")
  .map((accessorKey) => {
    if (accessorKey === "year") {
      return yearCol({ key: accessorKey });
    } else {
      return categoryCol({ key: accessorKey });
    }
  });

export const equityColumns = Object.keys(equityData[0])
  .filter((key) => key !== "id")
  .map((accessorKey) => {
    if (accessorKey === "year") {
      return yearCol({ key: accessorKey });
    } else {
      return categoryCol({ key: accessorKey });
    }
  });

export const liabilityColumns = Object.keys(liabilityData[0])
  .filter((key) => key !== "id")
  .map((accessorKey) => {
    if (accessorKey === "year") {
      return yearCol({ key: accessorKey });
    } else {
      return categoryCol({ key: accessorKey });
    }
  });

export const assetsColumns = Object.keys(assetData[0])
  .filter((key) => key !== "id")
  .map((accessorKey) => {
    if (accessorKey === "year") {
      return yearCol({ key: accessorKey });
    } else {
      return categoryCol({ key: accessorKey });
    }
  });

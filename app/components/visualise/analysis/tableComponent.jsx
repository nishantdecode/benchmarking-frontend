import {
  totalDepositsData,
  totalGrossLoansData,
} from "@/app/data/dashboardData";
import React from "react";
import { VisualiseTable } from "./visualiseTable";

const TableComponent = ({ category, columns, tableColData }) => {
  const data =
    category === "Total Deposits" ? totalDepositsData : totalGrossLoansData;
  return (
    <div className="flex flex-col gap-10 sm:gap-8">
      {data.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-1 pb-10 w-full">
            <div className="font-medium text-sm sm:text-lg">{item.category}:</div>
            <div>
              <VisualiseTable columns={columns} data={tableColData} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableComponent;

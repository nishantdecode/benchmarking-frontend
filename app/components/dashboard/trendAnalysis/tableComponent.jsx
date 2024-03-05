import React from "react";

import {
  totalDepositsData,
  totalGrossLoansData,
} from "@/app/data/dashboardData";

import { VisualiseTable } from "@/app/components/visualise/visualiseTable";

const TableComponent = ({ category, columns, tableColData }) => {
  const data =
    category === "Total Deposits" ? totalDepositsData : totalGrossLoansData;
  return (
    <div className="flex flex-col w-full gap-10 sm:gap-8">
      {data.map((item, index) => {
        return (
          <div key={index} className="flex flex-col w-full pb-10 gap-1">
              <div className="text-sm sm:text-lg font-medium">
                {item.category}:
              </div>
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

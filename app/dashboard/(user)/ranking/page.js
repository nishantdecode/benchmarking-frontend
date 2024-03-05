"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  balanceSheetCategories,
  balanceSheetData,
  incomeStatmentCategories,
} from "@/app/data/rankingData";

import { Card } from "@/components/ui/card";

import { SelectCategory } from "@/app/components/selectCategory";
import { generateColumns } from "@/app/components/visualise/columns";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";

const Ranking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const balanceCategory = searchParams.get("balanceCategory") ?
    decodeURIComponent(searchParams.get("balanceCategory")) : balanceSheetCategories[0].name;
  const incomeStatmentCategory = searchParams.get("incomeStatmentCategory") ?
    decodeURIComponent(searchParams.get("incomeStatmentCategory")) :
    incomeStatmentCategories[0].name;

  useEffect(() => {
    router.push(
      `?balanceCategory=${balanceCategory}&incomeStatmentCategory=${incomeStatmentCategory}`,
      { scroll: false }
    );
  }, [balanceCategory, incomeStatmentCategory]);

  const columns = generateColumns({
    data: balanceSheetData,
    initialType: "initialRank",
    type: "rank",
  });

  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col items-center w-full h-auto p-3 md:p-5 gap-3 md:gap-5">
        <div className="flex justify-center lg:justify-start min-w-full">
          <div className="text-lg lg:text-2xl font-bold mt-2">
            Balance Sheet/Bn
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
            <SelectCategory
              search={true}
              categories={balanceSheetCategories}
              categoryName="balanceCategory"
            />
          </div>
          <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseTable
              data={balanceSheetData}
              columns={columns}
              exportXls="true"
            />
          </div>
        </div>
      </Card>
      <Card className="flex flex-col items-center w-full h-auto p-3 md:p-5 gap-3 md:gap-5">
        <div className="flex justify-center lg:justify-start min-w-full">
          <div className="text-lg lg:text-2xl font-bold mt-2">
            Income Statement/Bn
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
            <SelectCategory
              search={true}
              categories={incomeStatmentCategories}
              categoryName="incomeStatmentCategory"
            />
          </div>
          <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseTable
              data={balanceSheetData}
              columns={columns}
              exportXls="true"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Ranking;

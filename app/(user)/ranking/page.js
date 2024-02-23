"use client";

import OptionButton from "@/app/components/market/optionButton";
import { SelectCategory } from "@/app/components/market/selectCategory";
import { columns } from "@/app/components/ranking/balanceColumn";
import { VisualiseTable } from "@/app/components/visualise/analysis/visualiseTable";
import {
  balanceSheetCategories,
  balanceSheetData,
  incomeStatmentCategories,
} from "@/app/data/rankingData";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";

const Ranking = () => {
  const [balanceCategory, setBalanceCategory] = useState(
    balanceSheetCategories[0].name
  );
  const [incomeCategory, setIncomeCategory] = useState(
    incomeStatmentCategories[0].name
  );
  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col w-full h-auto p-3 md:p-5 gap-3 md:5 lg:gap-5">
        <div className="flex justify-between min-w-full">
          <div className="text-2xl font-bold mt-2">Balance Sheet/Bn</div>
          <OptionButton />
        </div>
        <div className="flex flex-row w-full gap-5">
          <div className="lg:sticky lg:top-20 w-full lg:w-1/6 h-auto">
            <SelectCategory
              categories={balanceSheetCategories}
              category={balanceCategory}
              setCategory={setBalanceCategory}
            />
          </div>
          <div className="flex flex-col w-full lg:w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseTable data={balanceSheetData} columns={columns} />
          </div>
        </div>
      </Card>
      <Card className="flex flex-col w-full h-auto p-3 md:p-5 gap-3 md:5 lg:gap-5">
        <div className="flex justify-between min-w-full">
          <div className="text-2xl font-bold mt-2">Income Statement/Bn</div>
          <OptionButton />
        </div>
        <div className="flex flex-row w-full gap-5">
          <div className="lg:sticky lg:top-20 w-full lg:w-1/6 h-auto">
            <SelectCategory
              categories={incomeStatmentCategories}
              category={incomeCategory}
              setCategory={setIncomeCategory}
            />
          </div>
          <div className="flex flex-col w-full lg:w-5/6 pr-5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseTable data={balanceSheetData} columns={columns} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Ranking;

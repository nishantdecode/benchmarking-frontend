"use client";

import {
  assetsColumns,
  equityColumns,
  expenseColumns,
  incomeColumns,
  liabilityColumns,
} from "@/app/components/size/singleBank/columns";
import { ToggleBank } from "@/app/components/market/toggleBank";
import { VisualiseTable } from "@/app/components/visualise/analysis/visualiseTable";
import { banks } from "@/app/data/marketShareData";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import OptionButtons from "@/app/components/size/OptionsButtons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import {
  assetData,
  equityData,
  expenseData,
  incomeData,
  liabilityData,
} from "@/app/data/sizeData";

const SingleBankPage = () => {
  const [size, setSize] = useState("BS-CS");
  const [bank, setBank] = useState(banks[0].name);

  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col w-full h-auto p-3 md:p-5 gap-3 md:5 lg:gap-5">
        <div className="flex justify-between min-w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="toggleActive"
                className="flex justify-between text-xl gap-2 py-6 rounded-xl font-bold w-[200px]"
              >
                {size} <IoIosArrowDown className="text-primary" size={25} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuRadioGroup value={size} onValueChange={setSize}>
                <DropdownMenuRadioItem value="BS-CS">
                  BS - Common Size
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="IS-CS">
                  IS - Common Size
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <OptionButtons />
        </div>
        <div className="flex flex-row w-full gap-5">
          <div className="lg:sticky lg:top-14 w-full lg:w-1/6 h-full">
            <ToggleBank data={banks} bank={bank} setBank={setBank} />
          </div>
          {size === "BS-CS" ? (
            <div className="flex flex-col w-full lg:w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-20">
              <div className="flex flex-col w-full gap-3">
                <div className="text-xl font-semibold">Assets : {bank}</div>
                <VisualiseTable data={assetData} columns={assetsColumns} />
              </div>
              <div className="flex flex-col w-full gap-3">
                <div className="text-xl font-semibold">
                  Liabilities : {bank}
                </div>
                <VisualiseTable
                  data={liabilityData}
                  columns={liabilityColumns}
                />
              </div>
              <div className="flex flex-col w-full gap-3">
                <div className="text-xl font-semibold">
                  Shareholder's Equity : {bank}
                </div>
                <VisualiseTable data={equityData} columns={equityColumns} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full lg:w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-20">
              <div className="flex flex-col w-full gap-3">
                <div className="text-xl font-semibold">
                  Operating Income : {bank}
                </div>
                <VisualiseTable data={incomeData} columns={incomeColumns} />
              </div>
              <div className="flex flex-col w-full gap-3">
                <div className="text-xl font-semibold">
                  Operating Expense : {bank}
                </div>
                <VisualiseTable data={expenseData} columns={expenseColumns} />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SingleBankPage;

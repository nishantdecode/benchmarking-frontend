"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { banks } from "@/app/data/marketShareData";
import OptionButton from "@/app/components/market/optionButton";
import { VisualiseTable } from "@/app/components/visualise/analysis/visualiseTable";
import { balanceSheetData, incomeStatementData, statementCategories } from "@/app/data/bankStatementData";
import { SelectCategory } from "@/app/components/market/selectCategory";
import { Card } from "@/components/ui/card";
import { generateColumns } from "@/app/components/bank/column";

const Bank = () => {
  const [category, setCategory] = useState(statementCategories[0].name)
  const [bank, setBank] = useState(banks[0].name);
  const data = category === 'Balance Sheet' ? balanceSheetData : incomeStatementData;
  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <div className="flex flex-row justify-between min-w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="toggleActive"
              className="flex justify-between text-md gap-2 py-6 rounded-xl font-bold w-[220px]"
            >
              {bank} <IoIosArrowDown className="text-primary" size={25} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30">
            <DropdownMenuRadioGroup value={bank} onValueChange={setBank}>
              {banks.map((item, index) => {
                return (
                  <DropdownMenuRadioItem key={index} value={item.name}>
                    {item.name}
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <OptionButton />
      </div>
      <div className="flex flex-row w-full gap-5">
        <div className="lg:sticky lg:top-14 w-full lg:w-1/6 h-full">
          <SelectCategory categories={statementCategories} category={category} setCategory={setCategory} />
        </div>
        <Card className="flex flex-col w-full lg:w-5/6 p-10 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
          {Object.keys(data).map((key,index)=>{
            const columns = generateColumns(data[key])
            return (
            <VisualiseTable key={index} data={data[key]} columns={columns} />
          )})}
        </Card>
      </div>
    </div>
  );
};

export default Bank;

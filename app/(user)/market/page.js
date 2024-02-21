'use client'

import { columns } from "@/app/components/market/columns";
import { DonutPagination } from "@/app/components/market/donutPagination";
import OptionButton from "@/app/components/market/optionButton";
import { SelectBanks } from "@/app/components/market/selectBanks";
import { SelectCategory } from "@/app/components/market/selectCategory";
import { ToggleBank } from "@/app/components/market/toggleBank";
import { VisualiseTable } from "@/app/components/visualise/analysis/visualiseTable";
import { VisualiseDonut } from "@/app/components/visualise/visualiseDonut";
import { categories, individualBankMarketData, marketShareByCategory, banks } from "@/app/data/marketShareData";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";

const Market = () => {
  const [bank, setBank] = useState(banks[0].name)
  const [category, setCategory] = useState(categories[0].name)
  const [checkedBanks, setCheckedBanks] = useState(banks.map((bank)=> bank.name))
  const dataFormatter = (number) => number + "%";
  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col w-full h-auto p-3 md:p-5 gap-3 md:5 lg:gap-5">
        <div className="flex justify-between min-w-full">
          <div className="flex flex-row gap-16">
            <div className="text-2xl font-bold">Individual Bank</div>
            <div className="text-xs sm:text-sm font-medium mt-2">{bank}</div>
          </div>
          <OptionButton />
        </div>
        <div className="flex flex-row w-full gap-5">
          <div className="lg:sticky lg:top-14 w-full lg:w-1/6 h-full">
            <ToggleBank data={banks} bank={bank} setBank={setBank}/>
          </div>
          <div className="flex flex-col w-full lg:w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseTable data={individualBankMarketData} columns={columns} />
          </div>
        </div>
      </Card>
      <Card className="flex flex-col w-full h-auto p-3 md:p-5 gap-3 md:5 lg:gap-5">
        <div className="flex justify-between min-w-full">
          <div className="flex flex-row gap-16">
            <div className="text-2xl font-bold">Comparision</div>
            <div className="text-xs sm:text-sm font-medium mt-2">{category}</div>
          </div>
          <OptionButton />
        </div>
        <div className="flex flex-row w-full h-auto gap-5">
          <div className="lg:sticky lg:top-14 w-full lg:w-1/6 h-full">
            <SelectCategory categories={categories} category={category} setCategory={setCategory} />
          </div>
          <div className="flex flex-col justify-center items-center w-full lg:w-4/6 h-auto px-20 sm:gap-3 md:gap-8 lg:gap-16">
            <VisualiseDonut data={marketShareByCategory} dataFormatter={dataFormatter}/>
            <DonutPagination/>
          </div>
          <div className="lg:sticky lg:top-14 w-full lg:w-1/6 h-full">
            <SelectBanks banks={banks} checkedBanks={checkedBanks} setCheckedBanks={setCheckedBanks}/>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Market;

"use client";

import OptionButtons from "@/app/components/dashboard/analysis/optionButtons";
import { columns } from "@/app/components/ratio/columns";
import OptionButton from "@/app/components/market/optionButton";
import { SelectBanks } from "@/app/components/market/selectBanks";
import { SelectCategory } from "@/app/components/market/selectCategory";
import { ToggleBank } from "@/app/components/market/toggleBank";
import VisualiseOptions from "@/app/components/ratio/visualiseOptions";
import { VisualiseTable } from "@/app/components/visualise/analysis/visualiseTable";
import { VisualiseLine } from "@/app/components/visualise/visualiseLine";
import { bankMultipleRatioData, figuresData } from "@/app/data/ratioData";
import {
  banks,
} from "@/app/data/marketShareData";
import { categories } from "@/app/data/ratioData";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";

const MultiBankPage = () => {
  const currentYear = new Date().getFullYear();
  const [bank, setBank] = useState(banks[0].name);
  const [category, setCategory] = useState(categories[0].name);
  const [interval, setInterval] = useState("YoY & YTD");
  const [startYear, setStartYear] = useState(currentYear);
  const [endYear, setEndYear] = useState(startYear - 1);
  const [checkedBanks, setCheckedBanks] = useState(
    banks.map((bank) => bank.name)
  );
  const displayedCategory = categories.find(
    (categoryObj) => categoryObj.name === category
  );
  const data = bankMultipleRatioData;
  const fields = Object.keys(data[0]);
  const index = fields[0];
  const dataCategories = fields.slice(1, fields.length);
  const dataFormatter = (number) => number+'%';
  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col w-full h-auto p-3 md:p-5 gap-3 md:5 lg:gap-5">
        <div className="flex justify-between min-w-full">
          <div className="flex flex-row gap-24">
            <div className="text-2xl font-bold mt-2">Key Ratios</div>
            <div className="text-xs sm:text-sm font-medium mt-2">
              <VisualiseOptions
                category={category}
                interval={interval}
                setInterval={setInterval}
                startYear={startYear}
                setStartYear={setStartYear}
                endYear={endYear}
                setEndYear={setEndYear}
              />
            </div>
          </div>
          <OptionButtons />
        </div>
        <div className="flex flex-row w-full gap-5">
          <div className="lg:sticky lg:top-20 w-full lg:w-1/6 h-auto">
            <SelectCategory
              categories={categories}
              category={category}
              setCategory={setCategory}
            />
          </div>
          <div className="flex flex-col w-full lg:w-4/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseLine
              height={"h-full"}
              data={data}
              categories={dataCategories}
              index={index}
              dataFormatter={dataFormatter}
            />
          </div>
          <div className="lg:sticky lg:top-14 w-full lg:w-1/6 h-full">
            <SelectBanks
              banks={banks}
              checkedBanks={checkedBanks}
              setCheckedBanks={setCheckedBanks}
            />
          </div>
        </div>
      </Card>
      <Card className="flex flex-col w-full h-auto p-3 md:p-5 gap-3 md:5 lg:gap-5">
        <div className="flex justify-between min-w-full">
          <div className="flex flex-row">
            <div className="text-2xl font-bold">Figures</div>
          </div>
          <OptionButton />
        </div>
        <div className="flex flex-row w-full gap-5">
          <div className="lg:sticky lg:top-20 w-full lg:w-1/6 h-full">
            <ToggleBank data={banks} bank={bank} setBank={setBank}/>
          </div>
          <div className="flex flex-col w-full lg:w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseTable data={figuresData} columns={columns} input="true"/>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MultiBankPage;

"use client";

import React, { useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { banks } from "@/app/data/data";
import { categories } from "@/app/data/ratioData";
import { bankMultipleRatioData, figuresData } from "@/app/data/ratioData";

import { Card } from "@/components/ui/card";

import { ToggleBank } from "@/app/components/toggleBank";
import { SelectBanks } from "@/app/components/selectBanks";
import { visualisationUtils } from "@/util/visualisationUtils";
import { downloadImage, downloadPDF } from "@/util/exportUtils";
import { SelectCategory } from "@/app/components/selectCategory";
import { generateColumns } from "@/app/components/visualise/columns";
import OptionButtons from "@/app/components/visualise/optionButtons";
import DataIntervalOptions from "@/app/components/dataIntervalOptions";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import VisualiseLineChart from "@/app/components/visualise/visualiseLineChart";

const Ratio = () => {
  let ref = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const years = [2019, 2020, 2021, 2022];
  const bank = searchParams.get("bank") || banks[0].name;
  const checkedBanks =
    JSON.parse(searchParams.get("checkedBanks")) ||
    banks.map((bank) => bank.name);
  const category = searchParams.get("category") || categories[0].name;
  const intervalType = searchParams.get("intervalType") || "YoY & YTD";
  const start = JSON.parse(searchParams.get("start")) || {
    first: "Q1",
    second: years[0],
  };
  const end = JSON.parse(searchParams.get("end")) || {
    first: "Q1",
    second: years[years.length - 1],
  };

  useEffect(() => {
    router.push(
      `?bank=${bank}&category=${category}&checkedBanks=${JSON.stringify(
        checkedBanks
      )}&intervalType=${encodeURIComponent(
        intervalType
      )}&start=${JSON.stringify({
        first: start.first,
        second: start.second,
      })}&end=${JSON.stringify({
        first: end.first,
        second: end.second,
      })}`,
      { scroll: false }
    );
  }, []);

  const { data, bankColors, dataFormatterPercentage } = visualisationUtils(
    category,
    bankMultipleRatioData
  );

  const columns = generateColumns({
    data: figuresData,
  });

  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col items-center w-full h-auto p-3 md:p-5 gap-3 md:gap-5">
        <div className="flex flex-col lg:flex-row justify-between items-center min-w-full gap-3">
          <span className="w-auto lg:w-1/6 text-2xl font-bold mt-2 truncate text-ellipsis">Key Ratios</span>
          <div className="w-full lg:w-4/6 text-xs sm:text-sm font-medium">
            <DataIntervalOptions years={[2019, 2020, 2021, 2022]}/>
          </div>
          <div className="flex justify-center lg:justify-end w-full lg:w-1/6">
            <OptionButtons
              downloadImage={() => downloadImage(ref)}
              downloadPDF={() => downloadPDF(ref)}
              type="chart"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-14 lg:gap-2">
          <div className="lg:sticky lg:top-20 w-full sm:w-auto lg:w-1/6 h-auto">
            <SelectCategory categories={categories} />
          </div>
          <div className="flex flex-col h-[300px] md:h-[600px] w-full lg:w-4/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseLineChart
              ref={ref}
              data={data}
              colors={bankColors}
              xAxis={true}
              dataFormatter={dataFormatterPercentage}
            />
          </div>
          <div className="lg:sticky lg:top-14 w-full sm:w-auto lg:w-1/6 h-full">
            <SelectBanks banks={banks} />
          </div>
        </div>
      </Card>
      <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className="flex flex-col justify-center items-center lg:items-start h-full w-full sm:w-auto lg:w-1/6 gap-7">
            <span className="text-lg lg:text-2xl font-bold truncate text-ellipsis">Individual Bank</span>
            <ToggleBank data={banks} />
          </div>
          <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseTable
              title={bank}
              data={figuresData}
              columns={columns}
              search="true"
              exportXls="true"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Ratio;

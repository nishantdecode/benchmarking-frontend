"use client";

import React, { useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Card } from "@/components/ui/card";

import {
  categories as summaryCategories,
  figuresData,
} from "@/app/data/summaryData";
import { banks } from "@/app/data/data";
import { bankMultipleRatioData } from "@/app/data/ratioData";
import { categories as ratioCategories } from "@/app/data/ratioData";

import { ToggleBank } from "@/app/components/toggleBank";
import { SelectBanks } from "@/app/components/selectBanks";
import { visualisationUtils } from "@/util/visualisationUtils";
import { downloadImage, downloadPDF } from "@/util/exportUtils";
import { SelectCategory } from "@/app/components/selectCategory";
import OptionButtons from "@/app/components/visualise/optionButtons";
import { generateColumns } from "@/app/components/visualise/columns";
import DataIntervalOptions from "@/app/components/dataIntervalOptions";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import VisualiseLineChart from "@/app/components/visualise/visualiseLineChart";
import { SelectCategoryItems } from "@/app/components/summary/selectCategory";
import DataIntervalItemOptions from "@/app/components/summary/dataIntervalOptions";

const Summary = () => {
  let ref = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();
  const bank = searchParams.get("bank") || banks[0].name;
  const checkedBanks =
    JSON.parse(searchParams.get("checkedBanks")) ||
    banks.map((bank) => bank.name);
  const category = searchParams.get("category") || ratioCategories[0].name;
  const categoryItems =
    searchParams.get("categoryItems") || summaryCategories[0].name;
  const intervalTypeParam = searchParams.get("intervalType");
  const intervalType = intervalTypeParam
    ? decodeURIComponent(intervalTypeParam)
    : "YoY & YTD";
  const start = JSON.parse(searchParams.get("start")) || {
    first:
      intervalType === "Half-Yearly"
        ? "H1"
        : intervalType === "Quarterly"
        ? "Q1"
        : "",
    second: currentYear,
  };
  const end = JSON.parse(searchParams.get("end")) || {
    first:
      intervalType === "Half-Yearly"
        ? "H1"
        : intervalType === "Quarterly"
        ? "Q1"
        : "",
    second: currentYear - 1,
  };

  useEffect(() => {
    router.push(
      `?bank=${bank}&category=${category}&categoryItems=${categoryItems}&checkedBanks=${JSON.stringify(
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
  }, [bank, category, categoryItems, checkedBanks, intervalType, start, end]);

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
          <div className="w-auto lg:w-[180px] text-2xl font-bold mt-2">
            Items
          </div>
          <div className="w-full text-xs sm:text-sm font-medium">
            <DataIntervalItemOptions />
          </div>
          <OptionButtons
            downloadImage={() => downloadImage(ref)}
            downloadPDF={() => downloadPDF(ref)}
            type="chart"
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-14 lg:gap-2">
          <div className="lg:sticky lg:top-20 w-full sm:w-auto lg:w-1/6 h-auto">
            <SelectCategoryItems categories={summaryCategories} />
          </div>
          <div className="flex flex-col h-[300px] md:h-[600px] w-full lg:w-4/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseLineChart
              ref={ref}
              data={bankMultipleRatioData}
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
      <Card className="flex flex-col items-center w-full h-auto p-3 md:p-5 gap-3 md:gap-5">
        <div className="flex flex-col lg:flex-row justify-between items-center min-w-full gap-3">
          <div className="w-auto lg:w-[180px] text-2xl font-bold mt-2">
            Key Ratios
          </div>
          <div className="w-full text-xs sm:text-sm font-medium">
            <DataIntervalOptions />
          </div>
          <OptionButtons
            downloadImage={() => downloadImage(ref)}
            downloadPDF={() => downloadPDF(ref)}
            type="chart"
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-14 lg:gap-2">
          <div className="lg:sticky lg:top-20 w-full sm:w-auto lg:w-1/6 h-auto">
            <SelectCategory categories={ratioCategories} />
          </div>
          <div className="flex flex-col h-[300px] md:h-[600px] w-full lg:w-4/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseLineChart
              ref={ref}
              data={bankMultipleRatioData}
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
      <Card className="flex flex-col h-auto w-full p-3 md:p-5 md:pb-10 gap-5 lg:gap-10">
        <div className="flex justify-between min-w-full">
          <div className="flex flex-row gap-16">
            <div className="text-lg lg:text-2xl font-bold">Figures</div>
            <div className="hidden lg:block mt-2 text-xs sm:text-sm font-medium">
              {bank}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
            <ToggleBank data={banks} />
          </div>
          <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseTable
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

export default Summary;

"use client";

import React, { useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { banks } from "@/app/data/data";
import {
  categories,
  individualBankMarketData,
  marketShareByCategory,
} from "@/app/data/marketShareData";

import { Card } from "@/components/ui/card";

import generateMarketData from "@/util/marketDataUtils";
import { ToggleBank } from "@/app/components/toggleBank";
import { SelectBanks } from "@/app/components/selectBanks";
import { generateColumns } from "@/app/components/visualise/columns";
import OptionButtons from "@/app/components/visualise/optionButtons";
import { SelectCategory } from "@/app/components/selectCategory";
import { DonutPagination } from "@/app/components/market/donutPagination";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import { downloadImage, downloadPDF, downloadSheet } from "@/util/exportUtils";
import VisualiseDonutChart from "@/app/components/visualise/visualiseDonutChart";

const Market = () => {
  let ref = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();
  const year = searchParams.get("year") || currentYear;
  const bank = searchParams.get("bank") || banks[0].name;
  const category = searchParams.get("category") || categories[0].name;
  const checkedBanks =
    JSON.parse(searchParams.get("checkedBanks")) ||
    banks.map((bank) => bank.name);

  useEffect(() => {
    router.push(
      `?bank=${bank}&category=${category}&year=${year}&checkedBanks=${JSON.stringify(
        checkedBanks
      )}`,
      { scroll: false }
    );
  }, []);

  const color = banks.find((item) => item.name === bank).color;

  const columns = generateColumns({
    data: individualBankMarketData,
    type: "progress",
    color: color,
  });

  const marketData = generateMarketData(
    banks,
    marketShareByCategory,
    checkedBanks
  );

  return (
    <div className="flex flex-col justify-center items-start h-auto w-screen overflow-clip mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
        <div className="flex flex-col lg:flex-row justify-center items-center min-w-full gap-5">
          <span className="w-full lg:w-1/6 text-xl lg:text-2xl text-center lg:text-left font-bold truncate text-ellipsis">
            Individual Bank
          </span>
          <div className="flex justify-center lg:justify-between w-full lg:w-5/6">
            <div className="hidden lg:block mt-2 text-xs sm:text-sm font-medium">
              {bank}
            </div>
            <OptionButtons
              type="table"
              downloadSheet={() =>
                downloadSheet(
                  individualBankMarketData,
                  "Sheet Name",
                  "File Name"
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
            <ToggleBank data={banks} />
          </div>
          <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
            <VisualiseTable data={individualBankMarketData} columns={columns} />
          </div>
        </div>
      </Card>
      <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
        <div className="flex flex-col lg:flex-row justify-center items-center min-w-full gap-5">
          <span className="w-full lg:w-1/6 text-xl lg:text-2xl text-center lg:text-left font-bold truncate text-ellipsis">
            Comparision
          </span>
          <div className="flex justify-center lg:justify-between w-full lg:w-5/6">
            <div className="hidden lg:block mt-2 text-xs sm:text-sm font-medium">
              {category}
            </div>
            <OptionButtons
              downloadPDF={() => downloadPDF(ref)}
              downloadImage={() => downloadImage(ref)}
              type="chart"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-14 lg:gap-0">
          <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
            <SelectCategory search={true} categories={categories} />
          </div>
          <div className="flex flex-col justify-center items-center h-[300px] xs:h-[400] md:h-[500px] w-full lg:w-4/6 md:mt-10 gap-5 md:gap-8 lg:gap-10">
            <VisualiseDonutChart ref={ref} marketData={marketData} />
            <DonutPagination />
          </div>
          <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
            <SelectBanks banks={banks} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Market;

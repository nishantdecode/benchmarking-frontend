"use client";

import React, { useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  analysisCategories,
} from "@/app/data/dashboardData";
import { banks } from "@/app/data/data";
import { visualisationUtils } from "@/util/visualisationUtils";
import { downloadImage, downloadPDF, downloadSheet } from "@/util/exportUtils";

import { Card } from "@/components/ui/card";

import Header from "@/app/components/dashboard/trendAnalysis/header";
import SelectCategory from "@/app/components/dashboard/trendAnalysis/selectCategory";
import { generateColumns } from "@/app/components/visualise/columns";
import VisualiseBarChart from "@/app/components/visualise/visualiseBarChart";
import VisualiseLineChart from "@/app/components/visualise/visualiseLineChart";
import TableComponent from "@/app/components/dashboard/trendAnalysis/tableComponent";

const TrendAndCompetitionAnalysis = ({}) => {
  let ref = useRef()
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || analysisCategories[0].category;
  const selectedBanks = JSON.parse(searchParams.get("banks")) || banks.slice(0, 3).map(bank => bank.name);

  useEffect(() => {
    router.push(
      `?category=${category}&banks=${JSON.stringify(selectedBanks)}`
    );
  }, [category, selectedBanks]);

  const { displayedCategory, data, bankColors, dataFormatterCurrency } = visualisationUtils(category);
  const columns = generateColumns({data:data});
  return (
    <>
      <div className="flex justify-center items-center h-auto w-full mt-14 p-5 pl-7 sm:pl-10">
        <Card className="flex flex-col lg:flex-row h-auto w-full p-3 md:p-5 gap-3 lg:gap-5">
          <div className="lg:sticky lg:top-20 h-full w-full lg:w-1/5">
            <SelectCategory
              categories={analysisCategories}
              downloadPDF={() => downloadPDF(ref)}
              downloadImage={() => downloadImage(ref)}
              downloadSheet={() => downloadSheet(data,"Sheet Name","File Name")}
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-col h-full w-full lg:w-4/5 pb-10 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <Header
              banks={banks}
              downloadPDF={() => downloadPDF(ref)}
              downloadImage={() => downloadImage(ref)}
              downloadSheet={() => downloadSheet(data,"Sheet Name","File Name")}
            />
            <div className="hidden sm:flex text-md sm:text-xl font-medium sm:font-bold">
              {category}:
            </div>
            {displayedCategory.visualise === "line" ? (
              <div className="h-[400px] sm:h-[60vh] md:h-[80vh] my-10">
                <VisualiseLineChart
                  ref={ref}
                  data={data}
                  colors={bankColors}
                  xAxis={true}
                  dataFormatter={dataFormatterCurrency}
                />
              </div>
            ) : displayedCategory.visualise === "bar" ? (
              <div className="h-[400px] sm:h-[60vh] md:h-[80vh] my-10">
                <VisualiseBarChart
                  ref={ref}
                  data={data}
                  colors={bankColors}
                  xAxis={true}
                  dataFormatter={dataFormatterCurrency}
                />
              </div>
            ) : (
              <TableComponent
                category={category}
                columns={columns}
                tableColData={data}
              />
            )}
            <div className="flex sm:hidden text-md sm:text-xl font-medium sm:font-bold py-4">
              {category}:
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TrendAndCompetitionAnalysis;

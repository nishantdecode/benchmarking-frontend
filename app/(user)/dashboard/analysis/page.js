"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { VisualiseBar } from "@/app/components/visualise/VisualiseBar";
import { VisualiseLine } from "@/app/components/visualise/VisualiseLine";
import Category from "@/app/components/dashboard/analysis/category";
import HeaderAnalysis from "@/app/components/dashboard/analysis/headerAnalysis";
import {
  analysisCategories,
  banks,
  bankMultipleData,
  bankBarMultipleData,
  tableColData,
} from "@/app/data/dashboardData";

import { IoTrendingUpSharp } from "react-icons/io5";
import { columns } from "@/app/components/dashboard/analysis/columns";
import TableComponent from "@/app/components/visualise/analysis/tableComponent";
import HeaderChild from "@/app/components/header/headerChild";

const TrendAndCompetitionAnalysis = ({}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category"));
  const [bank, setBank] = useState(searchParams.get("bank"));
  const [competitionOne, setCompetitionOne] = useState(
    searchParams.get("competitionOne")
  );
  const [competitionTwo, setCompetitionTwo] = useState(
    searchParams.get("competitionTwo")
  );
  useEffect(() => {
    router.push(
      `${pathName}?category=${category}&bank=${bank}&competitionOne=${competitionOne}&competitionTwo=${competitionTwo}`
    );
  }, [category, bank, competitionOne, competitionTwo]);
  const displayedCategory = analysisCategories.find(
    (categoryObj) => categoryObj.category === category
  );
  const data =
    displayedCategory.visualise === "line"
      ? bankMultipleData
      : displayedCategory.visualise === "bar"
      ? bankBarMultipleData
      : tableColData;
  const fields = Object.keys(data[0]);
  const index = fields[0];
  const categories = fields.slice(1, fields.length);
  const dataFormatter = (number) => number + 'C';
  return (
    <>
      <HeaderChild
        title="Trend & Competitive Analysis"
        icon={<IoTrendingUpSharp size={32} />}
        link="/dashboard"
      />
      <div className="flex justify-center items-center w-full h-full mt-14 p-5 pl-7 sm:pl-10">
        <Card className="flex flex-col lg:flex-row w-full h-full p-3 md:p-5 gap-3 md:5 lg:gap-5">
          <div className="lg:sticky lg:top-20 w-full lg:w-1/5 h-full">
            <Category
              categories={analysisCategories}
              category={category}
              setCategory={setCategory}
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-col w-full h-full lg:w-4/5 pb-10 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <HeaderAnalysis
              banks={banks}
              bank={bank}
              setBank={setBank}
              competitionOne={competitionOne}
              setCompetitionOne={setCompetitionOne}
              competitionTwo={competitionTwo}
              setCompetitionTwo={setCompetitionTwo}
            />
            <div className="hidden sm:flex text-lg sm:text-xl font-bold">
              {category}:
            </div>
            {displayedCategory.visualise === "line" ? (
              <VisualiseLine
                height={"h-[600px]"}
                data={data}
                categories={categories}
                index={index}
                dataFormatter={dataFormatter}
              />
            ) : displayedCategory.visualise === "bar" ? (
              <VisualiseBar
                data={data}
                categories={categories}
                index={index}
                dataFormatter={dataFormatter}
              />
            ) : (
              <TableComponent
                category={category}
                columns={columns}
                tableColData={tableColData}
              />
            )}
            <div className="flex sm:hidden text-lg sm:text-xl font-bold py-4">
              {category}:
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TrendAndCompetitionAnalysis;

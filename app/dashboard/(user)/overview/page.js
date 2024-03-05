"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import {
  competitionData,
  analysisCategories,
  bankData,
  bankBarData,
  tableData,
} from "@/app/data/dashboardData";
import { banks } from "@/app/data/data";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import SelectBank from "@/app/components/dashboard/selectBank";
import CompetitionCards from "@/app/components/dashboard/competitionCards";
import CompetitionHeader from "@/app/components/dashboard/competitionHeader";
import VisualiseLineChart from "@/app/components/visualise/visualiseLineChart";
import VisualiseBarChart from "@/app/components/visualise/visualiseBarChart";

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();
  const year = searchParams.get("year") || currentYear;
  const bank = searchParams.get("bank") || banks[0].name;

  useEffect(() => {
    router.push(`?year=${year}&bank=${bank}`);
  }, []);

  return (
    <>
      <div className="flex flex-col h-full w-full mt-14 p-5 pl-7 sm:pl-10 gap-10">
        <div className="flex flex-col justify-start items-start h-auto w-full gap-3">
          <CompetitionHeader />
          <CompetitionCards data={competitionData} />
        </div>

        <SelectBank banks={banks} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {analysisCategories.map((item, ind) => {
            const displayedCategory = analysisCategories.find(
              (categoryObj) => categoryObj.category === item.category
            );
            const data =
              displayedCategory.visualise === "line"
                ? bankData
                : displayedCategory.visualise === "bar"
                ? bankBarData
                : tableData;

            const names = Object.keys(data[0])
              .map((key) => key.replace(/ Income$/, ""))
              .filter((key) => key !== "year");
            const bankColors = names.map((name) => {
              const bankInfo = banks.find((bank) => bank.name === name);
              return bankInfo ? bankInfo.color : null;
            });
            const dataFormatter = (value) => {
              return "$" + value;
            };
            return (
              <Card key={ind} className="flex flex-col p-4 sm:p-4 md:p-8">
                <CardHeader className="flex flex-row justify-between py-2 pb-4 px-0">
                  <CardTitle className="text-lg md:text-xl">
                    {item.category}
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="px-3 sm:px-5 rounded-md sm:rounded-lg text-xs sm:text-md"
                    onClick={() => {
                      router.push(
                        `/dashboard/overview/trendAnalysis?category=${item.category}&bank=${bank}`
                      );
                    }}
                  >
                    View More
                  </Button>
                </CardHeader>
                {item.visualise === "line" ? (
                  <div className="h-[250px] xs:h-[300px] md:h-[350px]">
                    <VisualiseLineChart
                      data={data}
                      colors={bankColors}
                      xAxis={false}
                      dataFormatter={dataFormatter}
                    />
                  </div>
                ) : item.visualise === "bar" ? (
                  <div className="h-[250px] xs:h-[300px] md:h-[350px]">
                    <VisualiseBarChart
                      data={data}
                      colors={bankColors}
                      xAxis={false}
                      dataFormatter={dataFormatter}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

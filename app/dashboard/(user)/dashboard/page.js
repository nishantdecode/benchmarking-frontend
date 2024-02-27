"use client";

import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import {
  competitionData,
  analysisCategories,
  bankData,
  bankBarData,
  tableData,
} from "@/app/data/dashboardData";
import { banks } from "@/app/data/data";
import { IoIosArrowForward } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  const year = searchParams.get("year") || currentYear; //latest year for available data?
  const bank = searchParams.get("bank") || banks[0].name;
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.auth)?.user || null;

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      router.push("/login");
    } else {
      //logic for verification of token and refresh token
    }
    if (user != null) {
      setIsLoading(false);
    }
  }, [user]);

  //query: api/v1/bank/user/:userId
  //banks: [{name, iconUrl}]

  useEffect(() => {
    //query: api/v1/dashboard/year/:year
    //competitionData: [{name, highest{ name, iconUrl, value}, lowest{ name, iconUrl, value }}]

    //query: api/v1/dashboard/category?bank=bankName
    //categories in req body
    //bankData: [{year,"bank":value}]
    //bankBarData: [{year, income, expense}]
    router.push(`?year=${year}&bank=${bank}`);
    console.log(bank);
  }, [bank, year]);

  if (isLoading) {
    return (
      <>
        <div className="fixed top-0 flex flex-col justify-center h-12 w-full z-50 bg-card border-background drop-shadow-lg">
          <Skeleton className="flex flex-row justify-start items-center h-full w-full pl-5 bg-card">
            <Skeleton className="h-2/3 w-[200px] bg-background" />
          </Skeleton>
        </div>
        <Skeleton className="fixed top-0 flex flex-col justify-center h-screen w-2 bg-card">
          <Skeleton className="flex flex-col justify-center align-middle h-16 w-5 rounded-r-full bg-card">
            <IoIosArrowForward className="text-primary font-bold size-6" />
          </Skeleton>
        </Skeleton>
      </>
    );
  }

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
                        `/dashboard/analysis?category=${item.category}&bank=${bank}`
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

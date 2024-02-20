"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { MdSpaceDashboard } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import Header from "@/app/components/header/header";
import SelectBank from "@/app/components/dashboard/selectBank";
import { VisualiseLine } from "@/app/components/visualise/VisualiseLine";
import { VisualiseBar } from "@/app/components/visualise/VisualiseBar";
import CompetitionCards from "@/app/components/dashboard/competitionCards";
import CompetitionHeader from "@/app/components/dashboard/competitionHeader";

import {
  competitionData,
  banks,
  analysisCategories,
  bankData,
  bankBarData,
  tableData,
} from "@/app/data/dashboardData";

const Dashboard = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    //query: api/v1/dashboard/year/:year
    //competitionData: [{name, highest{ name, iconUrl, value}, lowest{ name, iconUrl, value }}]
    console.log(year);
  }, [year]);

  //query: api/v1/dashboard/banks
  //banks: [{name, iconUrl}]
  const [bankName, setBankName] = useState(banks[0].name);

  useEffect(() => {
    //query: api/v1/dashboard/category?bank=bankName
    //categories in req body
    //bankData: [{year,"bank":value}]
    //bankBarData: [{year, income, expense}]
    console.log(bankName);
  }, [bankName]);
  return (
    <>
      <Header title="Dashboard" icon={<MdSpaceDashboard size={32} />} />

      <div className="flex flex-col w-full h-full mt-14 p-5 pl-7 sm:pl-10 gap-10">
        <div className="flex flex-col justify-start items-start w-full h-auto gap-3">
          <CompetitionHeader year={year} setYear={setYear} />
          <CompetitionCards data={competitionData}/>
        </div>

        <SelectBank
          banks={banks}
          bankName={bankName}
          setBankName={setBankName}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {analysisCategories.map((item, ind) => {
            const displayedCategory = analysisCategories.find(
              (categoryObj) => categoryObj.category === item.category
            );
            const data = displayedCategory.visualise === "line" ? bankData : displayedCategory.visualise === "bar" ? bankBarData : tableData;
            const fields = Object.keys(data[0]);
            const index = fields[0];
            const categories = fields.slice(1, fields.length);
            const dataFormatter = (number) => number + 'C';
            return (
              <Card key={ind} className="p-4 sm:p-4 md:p-8">
                <CardHeader className="flex flex-row justify-between px-0 py-2 pb-4">
                  <CardTitle className="text-lg md:text-xl">
                    {item.category}
                  </CardTitle>
                  <Button
                    variant="outline"
                    className="px-3 sm:px-5 rounded-lg sm:rounded-xl text-xs sm:text-md"
                    onClick={() => {
                      router.push(
                        `/dashboard/analysis?category=${item.category}&bank=${bankName}`
                      );
                    }}
                  >
                    View More
                  </Button>
                </CardHeader>
                {item.visualise === "line" ? (
                  <VisualiseLine
                    height={"h-80"}
                    data={data}
                    categories={categories}
                    index={index}
                    dataFormatter={dataFormatter}
                  />
                ) : item.visualise === "bar" ? (
                  <VisualiseBar
                    data={data}
                    categories={categories}
                    index={index}
                    dataFormatter={dataFormatter}
                  />
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

"use client";

import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import { itemAnalysisCategories } from "@/app/data/categoryData";

import { Card } from "@/components/ui/card";

import { SelectCategory } from "@/app/components/selectCategory";
import { generateColumns } from "@/app/components/visualise/columns";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import { useGetRankByCategoryMutation } from "@/lib/features/services/analysisApi";

const Ranking = () => {
  const [getRank] = useGetRankByCategoryMutation();

  const [balanceSheet, setBalanceSheet] = useState([]);
  const [incomeStatement, setIncomeStatement] = useState([]);

  const [balanceSheetCategory, setBalanceSheetCategory] = useState(
    itemAnalysisCategories.balanceSheet[0].name
  );
  const [incomeStatementCategory, setIncomeStatementCategory] = useState(
    itemAnalysisCategories.incomeStatement[0].name
  );

  const banks = useSelector((state) => state.bank.banks);

  let balanceSheetColumns = null;
  if (balanceSheet.length !== 0) {
    balanceSheetColumns = generateColumns({
      data: balanceSheet,
      initialType: "initialRank",
      type: "rank",
      banks,
    });
  }

  let incomeStatementColumns = null;
  if (incomeStatement.length !== 0) {
    incomeStatementColumns = generateColumns({
      data: incomeStatement,
      initialType: "initialRank",
      type: "rank",
      banks,
    });
  }

  const getRankCategoryData = async ({
    table,
    setData,
    category,
    categories,
  }) => {
    const categoryValue = categories.find(
      (item) => item.name === category
    ).value;
    try {
      const response = await getRank({ table, category: categoryValue });
      if (response.data) {
        setData(response.data.result);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  useEffect(() => {
    getRankCategoryData({
      table: "balanceSheet",
      setData: setBalanceSheet,
      category: balanceSheetCategory,
      categories: itemAnalysisCategories.balanceSheet,
    });
  }, [balanceSheetCategory]);

  useEffect(() => {
    getRankCategoryData({
      table: "incomeStatement",
      setData: setIncomeStatement,
      category: incomeStatementCategory,
      categories: itemAnalysisCategories.incomeStatement,
    });
  }, [incomeStatementCategory]);

  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col items-center w-full h-auto p-3 md:p-5 gap-3 md:gap-5">
        <div className="flex justify-center lg:justify-start min-w-full">
          <div className="text-lg lg:text-2xl font-bold mt-2">
            Balance Sheet/Bn
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
            <SelectCategory
              search={true}
              height="h-[700px]"
              category={balanceSheetCategory}
              setCategory={setBalanceSheetCategory}
              categories={itemAnalysisCategories.balanceSheet}
            />
          </div>
          <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
            {balanceSheet.length !== 0 && (
              <VisualiseTable
                exportXls="true"
                data={balanceSheet}
                title={balanceSheetCategory}
                columns={balanceSheetColumns}
              />
            )}
          </div>
        </div>
      </Card>
      <Card className="flex flex-col items-center w-full h-auto p-3 md:p-5 gap-3 md:gap-5">
        <div className="flex justify-center lg:justify-start min-w-full">
          <div className="text-lg lg:text-2xl font-bold mt-2">
            Income Statement/Bn
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
            <SelectCategory
              search={true}
              height="h-[700px]"
              category={incomeStatementCategory}
              setCategory={setIncomeStatementCategory}
              categories={itemAnalysisCategories.incomeStatement}
            />
          </div>
          <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
            {incomeStatement.length !== 0 && (
              <VisualiseTable
                exportXls="true"
                data={incomeStatement}
                title={incomeStatementCategory}
                columns={incomeStatementColumns}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Ranking;

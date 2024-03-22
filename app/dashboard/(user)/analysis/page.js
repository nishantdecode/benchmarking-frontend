"use client";

import React, { useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  balanceSheetCategories,
  balanceSheetData,
  incomeStatementCategories,
  msBalanceSheetCategories,
  msBalanceSheetData,
  msIncomeStatementCategories,
  ratioCategories,
} from "@/app/data/analysis";
import { banks } from "@/app/data/data";
import { IoIosArrowDown } from "react-icons/io";
import { bankMultipleRatioData } from "@/app/data/ratioData";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { SelectBanks } from "@/app/components/selectBanks";
import { visualisationUtils } from "@/util/visualisationUtils";
import { downloadImage, downloadPDF } from "@/util/exportUtils";
import OptionButtons from "@/app/components/visualise/optionButtons";
import { SelectCategory } from "@/app/components/selectCategory";
import { generateColumns } from "@/app/components/visualise/columns";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import VisualiseLineChart from "@/app/components/visualise/visualiseLineChart";

const AnalysisPage = () => {
  let ref = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();

  const analysis = searchParams.get("item") || "Balance Sheet/BN";

  const checkedBanks =
    JSON.parse(searchParams.get("checkedBanks")) ||
    banks.map((bank) => bank.name);

  const ratioCategory =
    searchParams.get("ratioCategory") || ratioCategories[0].name;
  const balanceSheetCategory =
    searchParams.get("balanceSheetCategory") || balanceSheetCategories[0].name;
  const msBalanceSheetCategory =
    searchParams.get("msBalanceSheetCategory") ||
    msBalanceSheetCategories[0].name;
  const incomeStatementCategory =
    searchParams.get("incomeStatementCategory") ||
    incomeStatementCategories[0].name;
  const msIncomeStatementCategory =
    searchParams.get("msIncomeStatementCategory") ||
    msIncomeStatementCategories[0].name;

  useEffect(() => {
    router.push(
      `?item=${analysis}&checkedBanks=${JSON.stringify(
        checkedBanks
      )}&ratioCategory=${ratioCategory}&balanceSheetCategory=${balanceSheetCategory}&msBalanceSheetCategory=${msBalanceSheetCategory}&incomeStatementCategory=${incomeStatementCategory}&msIncomeStatementCategory=${msIncomeStatementCategory}`,
      { scroll: false }
    );
  }, []);

  const { data, bankColors, dataFormatterPercentage } = visualisationUtils(
    ratioCategory,
    bankMultipleRatioData
  );

  const rankColumns = generateColumns({
    data: balanceSheetData,
    initialType: "bank",
    type: "itemRank",
  });

  const msColumns = generateColumns({
    data: balanceSheetData,
    initialType: "bank",
    type: "ms",
  });

  function navigate({ paramNameToUpdate, newValue }) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(paramNameToUpdate, newValue);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  }
  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
        <div className="flex justify-center lg:justify-start min-w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="toggleActive"
                className="flex justify-between text-md py-6 px-4 rounded-xl font-bold w-full sm:w-[230px]"
              >
                {analysis} <IoIosArrowDown className="text-primary" size={23} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuRadioGroup
                value={analysis}
                onValueChange={(v) => {
                  navigate({
                    paramNameToUpdate: "item",
                    newValue: v,
                  });
                }}
              >
                <DropdownMenuRadioItem
                  value="Balance Sheet/BN"
                  className="px-4"
                >
                  Balance Sheet/BN
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="Income Statement/BN"
                  className="px-4"
                >
                  Income Statement/BN
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Key Ratio" className="px-4">
                  Key Ratio
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {analysis === "Balance Sheet/BN" ? (
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
            <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
              <SelectCategory
                height="h-[700px]"
                search={true}
                categories={balanceSheetCategories}
                categoryName="balanceSheetCategory"
              />
            </div>
            <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
              <VisualiseTable
                data={balanceSheetData}
                columns={rankColumns}
                exportXls="true"
                title={balanceSheetCategory}
              />
            </div>
          </div>
        ) : analysis === "Income Statement/BN" ? (
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
            <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
              <SelectCategory
                height="h-[700px]"
                search={true}
                categories={incomeStatementCategories}
                categoryName="incomeStatementCategory"
              />
            </div>
            <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
              <VisualiseTable
                data={balanceSheetData}
                columns={rankColumns}
                exportXls="true"
                title={incomeStatementCategory}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-between items-start min-w-full gap-3">
            <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
              <SelectCategory
                search={true}
                categories={ratioCategories}
                categoryName="ratioCategory"
                height="h-[650px]"
              />
            </div>
            <div className="flex flex-col w-full lg:w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-5">
              <div className="flex flex-row w-full justify-between">
                <div className="text-xl font-semibold">{ratioCategory} :</div>
                <OptionButtons
                  downloadImage={() => downloadImage(ref)}
                  downloadPDF={() => downloadPDF(ref)}
                  type="chart"
                  view={true}
                />
              </div>
              <div className="flex flex-row h-full w-full">
                <div className="flex flex-col h-[300px] md:h-[600px] w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseLineChart
                    ref={ref}
                    data={data}
                    colors={bankColors}
                    xAxis={true}
                    dataFormatter={dataFormatterPercentage}
                  />
                </div>
                <div className="lg:sticky lg:top-14 w-full sm:w-auto lg:w-1/5 h-full">
                  <SelectBanks banks={banks} />
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
      {analysis === "Balance Sheet/BN" ? (
        <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
            <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
              <SelectCategory
                height="h-[700px]"
                search={true}
                categories={msBalanceSheetCategories}
                categoryName="msBalanceSheetCategory"
              />
            </div>
            <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
              <VisualiseTable
                data={msBalanceSheetData}
                columns={msColumns}
                title={msBalanceSheetCategory}
                exportXls="true"
              />
            </div>
          </div>
        </Card>
      ) : analysis === "Income Statement/BN" ? (
        <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
            <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
              <SelectCategory
                height="h-[700px]"
                search={true}
                categories={msIncomeStatementCategories}
                categoryName="msIncomeStatementCategory"
              />
            </div>
            <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
              <VisualiseTable
                data={msBalanceSheetData}
                columns={msColumns}
                title={msIncomeStatementCategory}
                exportXls="true"
              />
            </div>
          </div>
        </Card>
      ) : (
        <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
            <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
              <SelectCategory
                height="h-[700px]"
                search={true}
                categories={ratioCategories}
                categoryName="ratioCategory"
              />
            </div>
            <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
              <VisualiseTable
                data={msBalanceSheetData}
                columns={msColumns}
                title={msIncomeStatementCategory}
                exportXls="true"
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalysisPage;

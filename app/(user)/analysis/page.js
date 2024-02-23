"use client";

import { assetsColumns } from "@/app/components/size/singleBank/columns";
import { VisualiseTable } from "@/app/components/visualise/analysis/visualiseTable";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { assetData } from "@/app/data/sizeData";
import { SelectCategory } from "@/app/components/market/selectCategory";
import {
  balanceSheetCategories,
  balanceSheetData,
  incomeStatementCategories,
  msBalanceSheetCategories,
  msBalanceSheetData,
  msIncomeStatementCategories,
  ratioCategories,
} from "@/app/data/analysis";
import OptionButton from "@/app/components/market/optionButton";
import { columns } from "@/app/components/analysis/rankColumns";
import { msColumns } from "@/app/components/analysis/msColumns";
import { VisualiseLine } from "@/app/components/visualise/visualiseLine";
import { bankMultipleRatioData } from "@/app/data/ratioData";
import OptionButtons from "@/app/components/size/OptionsButtons";
import { SelectBanks } from "@/app/components/market/selectBanks";
import { banks } from "@/app/data/marketShareData";

const AnalysisPage = () => {
  const [analysis, setAnalysis] = useState("Balance Sheet/BN");
  const [balanceSheetCategory, setBalanceSheetCategory] = useState(
    balanceSheetCategories[0].name
  );
  const [msBalanceSheetCategory, setmsBalanceSheetCategory] = useState(
    msBalanceSheetCategories[0].name
  );
  const [incomeStatementCategory, setIncomeStatementCategory] = useState(
    incomeStatementCategories[0].name
  );
  const [msIncomeStatementCategory, setmsIncomeStatementCategory] = useState(
    msIncomeStatementCategories[0].name
  );
  const [ratioCategory, setRatioCategory] = useState(ratioCategories[0].name);

  const [checkedBanks, setCheckedBanks] = useState(
    banks.map((bank) => bank.name)
  );

  const data = bankMultipleRatioData;
  const fields = Object.keys(data[0]);
  const index = fields[0];
  const dataCategories = fields.slice(1, fields.length);
  const dataFormatter = (number) => number + "%";
  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col w-full h-auto p-3 md:p-5 gap-3 md:5 lg:gap-5">
        <div className="flex justify-between min-w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="toggleActive"
                className="flex justify-between text-md py-6 rounded-xl font-bold w-[230px]"
              >
                {analysis} <IoIosArrowDown className="text-primary" size={23} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuRadioGroup
                value={analysis}
                onValueChange={setAnalysis}
              >
                <DropdownMenuRadioItem value="Balance Sheet/BN">
                  Balance Sheet/BN
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Income Statement/BN">
                  Income Statement/BN
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Key Ratio">
                  Key Ratio
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {analysis === "Balance Sheet/BN" ? (
          <div className="flex flex-row w-full gap-5">
            <div className="lg:top-14 w-full lg:w-1/6 h-full">
              <SelectCategory
                categories={balanceSheetCategories}
                category={balanceSheetCategory}
                setCategory={setBalanceSheetCategory}
              />
            </div>
            <div className="flex flex-col w-full lg:w-5/6">
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-full justify-between">
                  <div className="text-xl font-semibold">
                    {balanceSheetCategory} :
                  </div>
                  <OptionButton />
                </div>
                <VisualiseTable data={balanceSheetData} columns={columns} />
              </div>
            </div>
          </div>
        ) : analysis === "Income Statement/BN" ? (
          <div className="flex flex-row w-full gap-5">
            <div className="lg:top-14 w-full lg:w-1/6 h-full">
              <SelectCategory
                categories={incomeStatementCategories}
                category={incomeStatementCategory}
                setCategory={setIncomeStatementCategory}
              />
            </div>
            <div className="flex flex-col w-full lg:w-5/6">
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-full justify-between">
                  <div className="text-xl font-semibold">
                    {incomeStatementCategory} :
                  </div>
                  <OptionButton />
                </div>
                <VisualiseTable data={balanceSheetData} columns={columns} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row w-full gap-5">
            <div className="lg:top-14 w-full lg:w-1/6 h-full">
              <SelectCategory
                categories={ratioCategories}
                category={ratioCategory}
                setCategory={setRatioCategory}
              />
            </div>
            <div className="flex flex-col w-full lg:w-4/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
              <div className="flex flex-col w-full gap-5">
                <div className="flex flex-row w-full justify-between">
                  <div className="text-xl font-semibold">{ratioCategory} :</div>
                  <OptionButtons />
                </div>
                <VisualiseLine
                  height={"h-[600px]"}
                  data={data}
                  categories={dataCategories}
                  index={index}
                  dataFormatter={dataFormatter}
                />
              </div>
            </div>
            <div className="lg:sticky lg:top-14 w-full lg:w-1/6 h-full">
              <SelectBanks
                banks={banks}
                checkedBanks={checkedBanks}
                setCheckedBanks={setCheckedBanks}
              />
            </div>
          </div>
        )}
      </Card>
      {analysis === "Balance Sheet/BN" ? (
        <Card className="flex flex-col w-full h-auto p-3 md:p-5 md:pt-10 gap-3 md:5 lg:gap-5">
          <div className="flex flex-row w-full gap-5">
            <div className="lg:top-14 w-full lg:w-1/6 h-full">
              <SelectCategory
                categories={msBalanceSheetCategories}
                category={msBalanceSheetCategory}
                setCategory={setmsBalanceSheetCategory}
              />
            </div>
            <div className="flex flex-col w-full lg:w-5/6">
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-full justify-between">
                  <div className="text-xl font-semibold">
                    {msBalanceSheetCategory} :
                  </div>
                  <OptionButton />
                </div>
                <VisualiseTable data={msBalanceSheetData} columns={msColumns} />
              </div>
            </div>
          </div>
        </Card>
      ) : analysis === "Income Statement/BN" ? (
        <Card className="flex flex-col w-full h-auto p-3 md:p-5 md:pt-10 gap-3 md:5 lg:gap-5">
          <div className="flex flex-row w-full gap-5">
            <div className="lg:top-14 w-full lg:w-1/6 h-full">
              <SelectCategory
                categories={msIncomeStatementCategories}
                category={msIncomeStatementCategory}
                setCategory={setmsIncomeStatementCategory}
              />
            </div>
            <div className="flex flex-col w-full lg:w-5/6">
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-full justify-between">
                  <div className="text-xl font-semibold">
                    {msIncomeStatementCategory} :
                  </div>
                  <OptionButton />
                </div>
                <VisualiseTable data={msBalanceSheetData} columns={msColumns} />
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="flex flex-col w-full h-auto p-3 md:p-5 md:pt-10 gap-3 md:5 lg:gap-5">
          <div className="flex flex-row w-full gap-5">
            <div className="lg:top-14 w-full lg:w-1/6 h-full">
              <SelectCategory
                categories={ratioCategories}
                category={ratioCategory}
                setCategory={setRatioCategory}
              />
            </div>
            <div className="flex flex-col w-full lg:w-5/6">
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-full justify-between">
                  <div className="text-xl font-semibold">{ratioCategory} :</div>
                  <OptionButton />
                </div>
                <VisualiseTable data={assetData} columns={assetsColumns} />
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalysisPage;

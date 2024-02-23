"use client";

import OptionButtons from "@/app/components/size/OptionsButtons";
import { SelectBanks } from "@/app/components/market/selectBanks";
import { SelectCategory } from "@/app/components/market/selectCategory";
import { VisualiseTable } from "@/app/components/visualise/analysis/visualiseTable";
import { banks } from "@/app/data/marketShareData";
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
import {
  assetCategories,
  equityCategories,
  expenseCategories,
  incomeCategories,
  incomeData,
  liabilityCategories,
} from "@/app/data/sizeData";
import { incomeColumns } from "@/app/components/size/singleBank/columns";

const MultiBankPage = () => {
  const [size, setSize] = useState("BS-CS");
  const [assetCategory, setAssetCategory] = useState(assetCategories[0].name);
  const [liabilityCategory, setLiabilityCategory] = useState(
    liabilityCategories[0].name
  );
  const [equityCategory, setEquityCategory] = useState(
    equityCategories[0].name
  );
  const [incomeCategory, setIncomeCategory] = useState(
    incomeCategories[0].name
  );
  const [expenseCategory, setExpenseCategory] = useState(
    expenseCategories[0].name
  );
  const [checkedBanks, setCheckedBanks] = useState(
    banks.map((bank) => bank.name)
  );
  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col w-full h-auto p-3 md:p-5 gap-3 md:5 lg:gap-5">
        <div className="flex justify-between min-w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="toggleActive"
                className="flex justify-between text-xl gap-2 py-6 rounded-xl font-bold w-[200px]"
              >
                {size} <IoIosArrowDown className="text-primary" size={25} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuRadioGroup value={size} onValueChange={setSize}>
                <DropdownMenuRadioItem value="BS-CS">
                  BS - Common Size
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="IS-CS">
                  IS - Common Size
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <OptionButtons />
        </div>
        <div className="flex flex-row w-full gap-5">
          {size === "BS-CS" ? (
            <div className="flex flex-col w-full lg:w-5/6 h-auto gap-16">
              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-full lg:w-1/5 h-auto gap-3">
                  <div className="text-lg font-semibold">Assets :</div>
                  <SelectCategory
                    categories={assetCategories}
                    category={assetCategory}
                    setCategory={setAssetCategory}
                  />
                </div>
                <div className="flex flex-col w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseTable data={incomeData} columns={incomeColumns} />
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-full lg:w-1/5 h-auto gap-3">
                  <div className="text-lg font-semibold">Liabilities :</div>
                  <SelectCategory
                    categories={liabilityCategories}
                    category={liabilityCategory}
                    setCategory={setLiabilityCategory}
                  />
                </div>
                <div className="flex flex-col w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseTable data={incomeData} columns={incomeColumns} />
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-full lg:w-1/5 h-auto gap-3">
                  <div className="text-lg font-semibold">
                    Shareholder's Equity :
                  </div>
                  <SelectCategory
                    categories={equityCategories}
                    category={equityCategory}
                    setCategory={setEquityCategory}
                  />
                </div>
                <div className="flex flex-col w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseTable data={incomeData} columns={incomeColumns} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full lg:w-5/6 h-auto gap-16">
              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-full lg:w-1/5 h-auto gap-3">
                  <div className="text-lg font-semibold">
                    Operating Income :
                  </div>
                  <SelectCategory
                    categories={incomeCategories}
                    category={incomeCategory}
                    setCategory={setIncomeCategory}
                  />
                </div>
                <div className="flex flex-col w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseTable data={incomeData} columns={incomeColumns} />
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-full lg:w-1/5 h-auto gap-3">
                  <div className="text-lg font-semibold">
                    Operating Expense :
                  </div>
                  <SelectCategory
                    categories={expenseCategories}
                    category={expenseCategory}
                    setCategory={setExpenseCategory}
                  />
                </div>
                <div className="flex flex-col w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseTable data={incomeData} columns={incomeColumns} />
                </div>
              </div>
            </div>
          )}
          <div className="lg:sticky lg:top-14 w-full lg:w-1/6 h-full">
            <SelectBanks
              banks={banks}
              checkedBanks={checkedBanks}
              setCheckedBanks={setCheckedBanks}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MultiBankPage;

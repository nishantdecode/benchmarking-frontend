"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  assetCategories,
  equityCategories,
  expenseCategories,
  incomeCategories,
  assetData,
  liabilityCategories,
} from "@/app/data/sizeData";
import { banks } from "@/app/data/data";
import { IoIosArrowDown } from "react-icons/io";

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
import { SelectCategory } from "@/app/components/selectCategory";
import OptionButtons from "@/app/components/visualise/optionButtons";
import { generateColumns } from "@/app/components/visualise/columns";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";

const MultiBankPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const size = searchParams.get("size") || "BS-CS";
  const assetCategory = searchParams.get("assetCategory") ?
    decodeURIComponent(searchParams.get("assetCategory")) :
    assetCategories[0].name;
  const liabilityCategory = searchParams.get("liabilityCategory") ?
    decodeURIComponent(searchParams.get("liabilityCategory")) : 
    liabilityCategories[0].name;
  const equityCategory = searchParams.get("equityCategory") ?
    decodeURIComponent(searchParams.get("equityCategory")) :
    equityCategories[0].name;
  const incomeCategory = searchParams.get("incomeCategory") ?
    decodeURIComponent(searchParams.get("incomeCategory")) : 
    incomeCategories[0].name;
  const expenseCategory = searchParams.get("expenseCategory") ?
    decodeURIComponent(searchParams.get("expenseCategory")) : 
    expenseCategories[0].name;
  const checkedBanks =
    JSON.parse(searchParams.get("checkedBanks")) ||
    banks.map((bank) => bank.name);

  useEffect(() => {
    router.push(
      `?size=${
        size
      }&checkedBanks=${
        JSON.stringify(
        checkedBanks
      )}&assetCategory=${
        encodeURIComponent(assetCategory)
      }&liabilityCategory=${
        encodeURIComponent(liabilityCategory)
      }&equityCategory=${
        encodeURIComponent(equityCategory)
      }&incomeCategory=${
        encodeURIComponent(incomeCategory)
      }&expenseCategory=${
        encodeURIComponent(expenseCategory)
      }`,
      { scroll: false }
    );
  }, []);

  function navigate({ paramNameToUpdate, newValue }) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(paramNameToUpdate, newValue);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  }

  const assetsColumns = generateColumns({
    data: assetData,
    type: "progress",
    color: "#CE0E2D",
  });

  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10">
      <Card className="flex flex-col w-full h-auto p-3 md:p-5 md:pt-10 gap-8 md:8 lg:gap-5">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="toggleActive"
                className="flex justify-between text-xl gap-2 py-6 rounded-xl font-bold w-full sm:w-[200px]"
              >
                {size} <IoIosArrowDown className="text-primary" size={25} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuRadioGroup
                value={size}
                onValueChange={(v) => {
                  navigate({
                    paramNameToUpdate: "size",
                    newValue: v,
                  });
                }}
              >
                <DropdownMenuRadioItem value="BS-CS">
                  BS - Common Size
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="IS-CS">
                  IS - Common Size
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <OptionButtons navigate={true} />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          {size === "BS-CS" ? (
            <div className="flex flex-col w-full lg:w-5/6 h-auto gap-5">
              <div className="flex flex-col lg:flex-row w-full gap-5">
                <div className="flex flex-col items-center w-full lg:w-1/5 h-auto gap-3">
                  <div className="text-lg font-semibold">Assets :</div>
                  <SelectCategory categories={assetCategories} categoryName="assetCategory"/>
                </div>
                <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseTable data={assetData} columns={assetsColumns} />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex flex-col items-center w-full lg:w-1/5 h-auto gap-3">
                  <div className="text-lg font-semibold">Liabilities :</div>
                  <SelectCategory categories={liabilityCategories} categoryName="liabilityCategory"/>
                </div>
                <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseTable data={assetData} columns={assetsColumns} />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex flex-col items-center w-full lg:w-1/5 h-auto gap-3">
                  <div className="text-lg font-semibold">
                    Shareholder&apos;s Equity :
                  </div>
                  <SelectCategory categories={equityCategories}  categoryName="equityCategory"/>
                </div>
                <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseTable data={assetData} columns={assetsColumns} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full lg:w-5/6 h-auto gap-16">
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex flex-col items-center w-full lg:w-1/5 h-auto gap-3">
                  <div className="text-lg font-semibold">
                    Operating Income :
                  </div>
                  <SelectCategory categories={incomeCategories} categoryName="incomeCategory"/>
                </div>
                <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseTable data={assetData} columns={assetsColumns} />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex flex-col items-center w-full lg:w-1/5 h-auto gap-3">
                  <div className="text-lg font-semibold">
                    Operating Expense :
                  </div>
                  <SelectCategory categories={expenseCategories} categoryName="expenseCategory"/>
                </div>
                <div className="flex flex-col h-[500px] sm:h-[700px] w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
                  <VisualiseTable data={assetData} columns={assetsColumns} />
                </div>
              </div>
            </div>
          )}
          <div className="lg:sticky lg:top-14 w-full sm:w-auto lg:w-1/6 h-full">
            <SelectBanks banks={banks} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MultiBankPage;

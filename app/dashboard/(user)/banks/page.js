"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  balanceSheetData,
  incomeStatementData,
  statementCategories,
} from "@/app/data/bankStatementData";
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

import { downloadSheet } from "@/util/exportUtils";
import { SelectCategory } from "@/app/components/selectCategory";
import { generateColumns } from "@/app/components/visualise/columns";
import OptionButtons from "@/app/components/visualise/optionButtons";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";

const Bank = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || statementCategories[0].name;
  const bank = searchParams.get("bank") || banks[0].name;
  const icon = banks.find((item) => item.name === bank).iconUrl;
  const data =
    category === "Balance Sheet" ? balanceSheetData : incomeStatementData;

  useEffect(() => {
    router.push(`?bank=${bank}&category=${category}`, { scroll: false });
  }, []);

  function navigate({ paramNameToUpdate, newValue }) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(paramNameToUpdate, newValue);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  }
  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <div className="flex flex-col lg:flex-row justify-between items-center min-w-full gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="toggleActive"
              className="flex justify-between text-md gap-2 py-6 rounded-xl font-bold w-full sm:w-[220px]"
            >
              <div className="flex flex-row gap-2">
                <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
                  <img src={icon} className="h-4 w-4"></img>
                </div>
                <span className="mt-1 text-xs truncate text-ellipsis">
                  {bank}
                </span>
              </div>
              <IoIosArrowDown className="text-primary" size={25} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuRadioGroup
              value={bank}
              onValueChange={(v) => {
                navigate({
                  paramNameToUpdate: "bank",
                  newValue: v,
                });
              }}
            >
              {banks.map((item, index) => {
                return (
                  <DropdownMenuRadioItem
                    key={index}
                    value={item.name}
                    className="pl-2 gap-2"
                  >
                    <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
                      <img src={item.iconUrl} className="h-4 w-4"></img>
                    </div>
                    <span className="text-xs truncate text-ellipsis">
                      {item.name}
                    </span>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <OptionButtons
          type="table"
          downloadSheet={() =>
            downloadSheet(balanceSheetData.first, "Sheet Name", "File Name")
          }
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
        <div className="lg:sticky lg:top-14 flex justify-center w-full lg:w-1/6">
          <SelectCategory categories={statementCategories} />
        </div>
        <Card className="flex flex-col w-full lg:w-5/6 p-3 lg:p-5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
          {Object.keys(data).map((key, index) => {
            const columns = generateColumns({ data: data[key] });
            return (
              <VisualiseTable key={index} data={data[key]} columns={columns} />
            );
          })}
        </Card>
      </div>
    </div>
  );
};

export default Bank;

"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  assetData,
  equityData,
  expenseData,
  incomeData,
  liabilityData,
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
import { ToggleBank } from "@/app/components/toggleBank";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import { generateColumns } from "@/app/components/visualise/columns";

const SingleBankPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const size = searchParams.get("size") || "BS-CS";
  const bank = searchParams.get("bank") || banks[0].name;
  const iconUrl = banks.find((item) => item.name === bank).iconUrl;
  const color = banks.find((item) => item.name === bank).color;

  useEffect(() => {
    router.push(`?bank=${bank}&size=${size}`, { scroll: false });
  }, []);

  function navigate({ paramNameToUpdate, newValue }) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(paramNameToUpdate, newValue);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  }

  const assetsColumns = generateColumns({
    data: assetData,
    type: "progress",
    color: color,
  });

  const liabilityColumns = generateColumns({
    data: liabilityData,
    type: "progress",
    color: color,
  });

  const equityColumns = generateColumns({
    data: equityData,
    type: "progress",
    color: color,
  });

  const incomeColumns = generateColumns({
    data: incomeData,
    type: "progress",
    color: color,
  });

  const expenseColumns = generateColumns({
    data: expenseData,
    type: "progress",
    color: color,
  });

  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10">
      <Card className="flex flex-col lg:flex-row h-auto w-full p-3 md:p-5 gap-3 lg:gap-2">
        <div className="lg:sticky lg:top-14 flex flex-col justify-start items-center h-full w-full lg:w-1/6 pr-2 gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="toggleActive"
                className="flex justify-between text-xl gap-2 py-6 rounded-xl font-bold w-full sm:w-[200px] lg:w-full"
              >
                {size} <IoIosArrowDown className="text-primary" size={25} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuRadioGroup
                value={size}
                onValueChange={(v) =>
                  navigate({
                    paramNameToUpdate: "size",
                    newValue: v,
                  })
                }
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
          <ToggleBank data={banks}/>
        </div>
        {size === "BS-CS" ? (
          <div className="flex flex-col justify-start items-center w-full lg:w-5/6 gap-10">
            <div className="h-[500px] sm:h-[700px] w-full overflow-scroll">
              <VisualiseTable
                title={
                  <div className="flex flex-row gap-2">
                    <div className="text-xl font-semibold">Assets : </div>
                    <div className="flex flex-row justify-center items-center h-8 w-8 rounded-full bg-secondary dark:bg-white">
                      <img src={iconUrl} className="h-4 w-4"></img>
                    </div>
                    <span className="text-xl truncate text-ellipsis">
                      {bank}
                    </span>
                  </div>
                }
                data={assetData}
                columns={assetsColumns}
                exportXls={true}
                navigate={true}
              />
            </div>
            <div className="h-[500px] sm:h-[700px] w-full overflow-scroll">
              <VisualiseTable
                title={
                  <div className="flex flex-row gap-2">
                    <div className="text-xl font-semibold">Liabilities :</div>
                    <div className="flex flex-row justify-center items-center h-8 w-8 rounded-full bg-secondary dark:bg-white">
                      <img src={iconUrl} className="h-4 w-4"></img>
                    </div>
                    <span className="text-xl truncate text-ellipsis">
                      {bank}
                    </span>
                  </div>
                }
                data={liabilityData}
                columns={liabilityColumns}
              />
            </div>
            <div className="h-[500px] sm:h-[700px] w-full overflow-scroll">
              <VisualiseTable
                title={
                  <div className="flex flex-row gap-2">
                    <div className="text-xl font-semibold">
                      Shareholder&apos;s Equity :
                    </div>
                    <div className="flex flex-row justify-center items-center h-8 w-8 rounded-full bg-secondary dark:bg-white">
                      <img src={iconUrl} className="h-4 w-4"></img>
                    </div>
                    <span className="text-xl truncate text-ellipsis">
                      {bank}
                    </span>
                  </div>
                }
                data={equityData}
                columns={equityColumns}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-start items-center w-full lg:w-5/6 gap-10">
            <div className="h-[500px] sm:h-[700px] w-full overflow-scroll">
              <VisualiseTable
                title={
                  <div className="flex flex-row gap-2">
                    <div className="text-xl font-semibold">
                      Operating Income :{" "}
                    </div>
                    <div className="flex flex-row justify-center items-center h-8 w-8 rounded-full bg-secondary dark:bg-white">
                      <img src={iconUrl} className="h-4 w-4"></img>
                    </div>
                    <span className="text-xl truncate text-ellipsis">
                      {bank}
                    </span>
                  </div>
                }
                exportXls={true}
                navigate={true}
                data={incomeData}
                columns={incomeColumns}
              />
            </div>
            <div className="h-[500px] sm:h-[700px] w-full overflow-scroll">
              <VisualiseTable
                title={
                  <div className="flex flex-row gap-2">
                    <div className="text-xl font-semibold">
                      Operating Expense :{" "}
                    </div>
                    <div className="flex flex-row justify-center items-center h-8 w-8 rounded-full bg-secondary dark:bg-white">
                      <img src={iconUrl} className="h-4 w-4"></img>
                    </div>
                    <span className="text-xl truncate text-ellipsis">
                      {bank}
                    </span>
                  </div>
                }
                data={expenseData}
                columns={expenseColumns}
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SingleBankPage;

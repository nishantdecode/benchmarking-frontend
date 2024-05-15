"use client";

import { useSelector } from "react-redux";
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useState, useEffect } from "react";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import {
  individualBankCategories,
  individualBankDataCategories,
} from "@/app/data/categoryData";
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

import showToast from "@/util/showToast";
import { useGetTablesDataMutation } from "@/lib/features/services/individualBankApi";
import { downloadSheet } from "@/util/exportUtils";
import { SelectCategory } from "@/app/components/selectCategory";
import { generateColumns } from "@/app/components/visualise/columns";
import OptionButtons from "@/app/components/visualise/optionButtons";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import { Skeleton } from "@/components/ui/skeleton";
import { DataDialog } from "@/app/components/banks/dataDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const Bank = () => {
  const [getTablesData] = useGetTablesDataMutation();

  const [data, setData] = useState([]);

  const banks = useSelector((state) => state.bank.banks);

  const [category, setCategory] = useState(individualBankCategories[0].name);
  const [bank, setBank] = useState(null);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dohnlambm",
    },
  });
  const myImage = cld.image(bank?.iconUrl || "bank_hmejcf");

  const handleAction = () => {
    console.log("Action");
  };

  const replaceCategoryNames = (data, categories) => {
    return data.map((dataObj) => {
      const newEntry = {};
      for (const key in dataObj) {
        console.log({[key]:dataObj[key]})
        const category = categories.find((item) => item.value === dataObj[key]);
        if (category) {
          newEntry["category"] = category.name;
        } else {
          newEntry[key] = dataObj[key].toLocaleString();
        }
      }
      return newEntry;
    });
  };

  const getBalanceSheetData = async () => {
    const bankId = bank.id;
    try {
      let tableGroups = null;
      switch (category) {
        case "Balance Sheet":
          tableGroups = {
            balanceSheet: [
              "assets",
              "liabilities",
              "shareEquityHolder",
              "equity",
              "liabilityAndEquity",
            ],
            financing: ["retail", "corporate", "creditCard"],
            customerDeposit: ["customerDeposit"],
          };
          break;
        case "Income Statement":
          tableGroups = {
            incomeStatement: [
              "nyi",
              "totalOperatingEquity",
              "totalOperatingExpenses",
              "netIncomeBeforeZakat",
              "netIncomeAfterZakat",
              "equityHolder",
              "totalNetIncome",
              "overall",
            ],
          };
          break;
        case "Investments":
          tableGroups = {
            investment: ["portfolio"],
          };
          break;
        case "Financing":
          tableGroups = {
            financing: ["retail", "corporate", "consumer", "creditCard"],
          };
          break;
        case "Customer’s deposit":
          tableGroups = {
            customerDeposit: ["customerDeposit"],
          };
          break;
        case "Debit Security Issued":
          tableGroups = {
            debitSecurity: ["debitSecurity"],
          };
          break;
        case "Trade Finance":
          tableGroups = {
            tradeFinance: ["tradeFinance"],
          };
          break;
        case "One off Income/Non-recurring Income":
          tableGroups = {
            oneOffIncome: ["oneOffIncome"],
          };
          break;
        case "Segments":
          tableGroups = {
            segment: ["retailSegment", "corporateSegment", "treasury"],
          };
          break;
        case "Capital Adequacy":
          tableGroups = {
            capitalAdequacy: ["capitalAdequacy"],
          };
          break;
        case "Channels":
          tableGroups = {
            channel: ["channel"],
          };
          break;
        case "Brokerage":
          tableGroups = {
            brokerage: ["brokerage"],
          };
          break;
        case "Cost/Income %":
          tableGroups = {
            costIncome: ["costIncome"],
          };
          break;
        case "Cost of Risk %":
          tableGroups = {
            costRisk: [
              "timeSaving",
              "otherIncomeRevenues",
              "provisions",
              "loan",
            ],
          };
          break;
        case "Market Share %":
          tableGroups = {
            marketShare: ["marketShare"],
          };
          break;
        default:
          break;
      }
      const response = await getTablesData({ bankId, tableGroups });
      if (response.data) {
        let data = response.data.result;
        let transformedData = {};
        for (const table of Object.keys(data)) {
          transformedData[table] = replaceCategoryNames(
            data[table],
            individualBankDataCategories[table]
          );
        }
        setData(transformedData);
      } else {
        setData([]);
        showToast("No Data!", response.error.result);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  useEffect(() => {
    if (bank && category) {
      getBalanceSheetData();
    }
  }, [bank, category]);

  useEffect(() => {
    if (banks && banks.length > 0) {
      setBank(banks[0]);
    }
  }, [banks]);

  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <div className="flex flex-col lg:flex-row justify-between items-center min-w-full gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="toggleActive"
              className="flex justify-between text-md gap-2 py-6 rounded-xl font-bold w-full sm:w-[220px]"
            >
              <div className="flex flex-row gap-2 truncate">
                <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
                  <AdvancedImage
                    className="w-4 h-4 object-cover rounded-full bg-white"
                    cldImg={myImage}
                    plugins={[responsive(), placeholder()]}
                  />
                </div>
                <span className="mt-1 text-xs truncate text-ellipsis">
                  {bank?.name}
                </span>
              </div>
              <IoIosArrowDown className="text-primary" size={25} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuRadioGroup
              value={bank}
              onValueChange={(v) => {
                setBank(v);
              }}
            >
              {banks?.map((item, index) => {
                const myImage = cld.image(item.iconUrl);
                return (
                  <DropdownMenuRadioItem
                    key={index}
                    value={item}
                    className="pl-2 gap-2"
                  >
                    <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
                      <AdvancedImage
                        className="w-4 h-4 object-cover rounded-full bg-white"
                        cldImg={myImage}
                        plugins={[responsive(), placeholder()]}
                      />
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
        <div className="flex flex-col lg:flex-row gap-2">
          <OptionButtons
            type="table"
            downloadSheet={() =>
              downloadSheet(
                banks,
                null,
                category,
                Object.keys(data),
                Object.keys(data).map((item) => {
                  return data[item];
                })
              )
            }
          />
          {banks && banks?.length !== 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="default" className="w-full text-xs">
                  Add Data
                </Button>
              </DialogTrigger>
              <DataDialog banks={banks} handleAction={handleAction} />
            </Dialog>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
        <div className="lg:sticky lg:top-14 flex justify-center w-full lg:w-1/6">
          <SelectCategory
            category={category}
            setCategory={setCategory}
            categories={individualBankCategories}
          />
        </div>
        {data && data[Object.keys(data)[0]]?.length !== 0 ? (
          <Card className="flex flex-col w-full lg:w-5/6 p-3 lg:p-5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            {Object.keys(data).map((key, index) => {
              const columns = generateColumns({ data: data[key] });
              return (
                <VisualiseTable
                  key={index}
                  data={data[key]}
                  columns={columns}
                />
              );
            })}
          </Card>
        ) : (
          <Skeleton className="hidden lg:flex h-full lg:h-[600px] w-full" />
        )}
      </div>
    </div>
  );
};

export default Bank;

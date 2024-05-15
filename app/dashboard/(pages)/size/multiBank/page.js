"use client";

import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { commonSizeCategories } from "@/app/data/categoryData";

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
import { SelectBanks } from "@/app/components/selectBanks";
import { SelectCategory } from "@/app/components/selectCategory";
import OptionButtons from "@/app/components/visualise/optionButtons";
import { generateColumns } from "@/app/components/visualise/columns";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import { useGetSizeOfBanksMutation } from "@/lib/features/services/sizeApi";
import { downloadSheet } from "@/util/exportUtils";

const MultiBankPage = () => {
  const [getSizeOfBanks] = useGetSizeOfBanksMutation();

  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [shareholdersEquity, setShareholdersEquity] = useState([]);
  const [operatingIncome, setOperatingIncome] = useState([]);
  const [operatingExpenses, setOperatingExpenses] = useState([]);

  const [size, setSize] = useState("Balance Sheet");
  const [assetCategory, setAssetCategory] = useState(
    commonSizeCategories.assets[0].name
  );
  const [liabilityCategory, setLiabilityCategory] = useState(
    commonSizeCategories.liabilities[0].name
  );
  const [equityCategory, setEquityCategory] = useState(
    commonSizeCategories.shareholders_equity[0].name
  );
  const [incomeCategory, setIncomeCategory] = useState(
    commonSizeCategories.operating_income[0].name
  );
  const [expenseCategory, setExpenseCategory] = useState(
    commonSizeCategories.operating_expenses[0].name
  );
  const [checkedBanks, setCheckedBanks] = useState([]);

  const banks = useSelector((state) => state.bank.banks) || [];

  let assetsColumns = null;
  if (assets.length !== 0 && banks.length !== 0) {
    assetsColumns = generateColumns({
      data: assets,
      type: "progressBank",
      banks,
    });
  }

  let liabilityColumns = null;
  if (liabilities.length !== 0 && banks.length !== 0) {
    liabilityColumns = generateColumns({
      data: liabilities,
      type: "progressBank",
      banks,
    });
  }

  let equityColumns = null;
  if (shareholdersEquity.length !== 0 && banks.length !== 0) {
    equityColumns = generateColumns({
      data: shareholdersEquity,
      type: "progressBank",
      banks,
    });
  }

  let incomeColumns = null;
  if (operatingIncome.length !== 0 && banks.length !== 0) {
    incomeColumns = generateColumns({
      data: operatingIncome,
      type: "progressBank",
      banks,
    });
  }

  let expenseColumns = null;
  if (operatingExpenses.length !== 0 && banks.length !== 0) {
    expenseColumns = generateColumns({
      data: operatingExpenses,
      type: "progressBank",
      banks,
    });
  }

  const getMultipleBankData = async ({ table, category, setData }) => {
    const bankIds = checkedBanks.map(
      (name) => banks?.find((item) => item.name === name)?.id
    );
    try {
      const response = await getSizeOfBanks({ bankIds, table, category });
      if (response.data) {
        setData(response.data.result);
      } else {
        setData([]);
        showToast("No Data!", response.error.result);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  useEffect(() => {
    if (assetCategory && checkedBanks.length !== 0) {
      const category = commonSizeCategories.assets.find(
        (item) => item.name === assetCategory
      ).value;
      getMultipleBankData({
        category,
        table: "assets",
        setData: setAssets,
      });
    } else {
      setAssets([]);
    }
  }, [assetCategory, checkedBanks]);

  useEffect(() => {
    if (liabilityCategory && checkedBanks.length !== 0) {
      const category = commonSizeCategories.liabilities.find(
        (item) => item.name === liabilityCategory
      ).value;
      getMultipleBankData({
        category,
        table: "liabilities",
        setData: setLiabilities,
      });
    } else {
      setLiabilities([]);
    }
  }, [liabilityCategory, checkedBanks]);

  useEffect(() => {
    if (equityCategory && checkedBanks.length !== 0) {
      const category = commonSizeCategories.shareholders_equity.find(
        (item) => item.name === equityCategory
      ).value;
      getMultipleBankData({
        category,
        table: "shareholders_equity",
        setData: setShareholdersEquity,
      });
    } else {
      setShareholdersEquity([]);
    }
  }, [equityCategory, checkedBanks]);

  useEffect(() => {
    if (incomeCategory && checkedBanks.length !== 0) {
      const category = commonSizeCategories.operating_income.find(
        (item) => item.name === incomeCategory
      ).value;
      getMultipleBankData({
        category,
        table: "operating_income",
        setData: setOperatingIncome,
      });
    } else {
      setOperatingIncome([]);
    }
  }, [incomeCategory, checkedBanks]);

  useEffect(() => {
    if (expenseCategory && checkedBanks.length !== 0) {
      const category = commonSizeCategories.operating_expenses.find(
        (item) => item.name === expenseCategory
      ).value;
      getMultipleBankData({
        category,
        table: "operating_expenses",
        setData: setOperatingExpenses,
      });
    } else {
      setOperatingExpenses([]);
    }
  }, [expenseCategory, checkedBanks]);

  useEffect(() => {
    if (banks && banks.length > 0) {
      setCheckedBanks(banks.map((bank) => bank.name));
    }
  }, [banks]);

  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10">
      <Card className="flex flex-col items-center w-full h-auto p-3 md:p-5 gap-5 md:gap-8">
        <div className="flex flex-col lg:flex-row justify-between items-center min-w-full gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="toggleActive"
                className="flex justify-between text-xl gap-2 py-6 rounded-xl font-bold w-full sm:w-[220px] lg:w-1/6"
              >
                {size} <IoIosArrowDown className="text-primary" size={25} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 p-2">
              <DropdownMenuRadioGroup
                value={size}
                onValueChange={(v) => {
                  setSize(v);
                }}
              >
                <DropdownMenuRadioItem value="Balance Sheet" className="px-3">
                Balance Sheet
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Income Statement" className="px-3">
                Income Statement
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <OptionButtons
            navigate={true}
            downloadSheet={() => {
              downloadSheet(
                banks,
                null,
                "Common Size Multiple Banks",
                [
                  "assets",
                  "liabilities",
                  "shareholdersEquity",
                  "operatingIncome",
                  "operatingExpense",
                ],
                [
                  assets,
                  liabilities,
                  shareholdersEquity,
                  operatingIncome,
                  operatingExpenses,
                ]
              );
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-3">
          {size === "Balance Sheet" ? (
            <div className="flex flex-col w-full lg:w-5/6 h-auto gap-10">
              <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-3 lg:gap-3">
                <div className="flex flex-col items-center w-full lg:w-1/5 h-auto gap-3">
                  <span className="w-full text-center lg:text-left text-lg font-semibold truncate text-ellipsis">
                    Assets :
                  </span>
                  <SelectCategory
                    category={assetCategory}
                    setCategory={setAssetCategory}
                    categories={commonSizeCategories.assets}
                  />
                </div>
                <div className="flex flex-col h-auto w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  {assets.length !== 0 && (
                    <VisualiseTable data={assets} columns={assetsColumns} />
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-3 lg:gap-3">
                <div className="flex flex-col items-center w-full lg:w-1/5 h-auto gap-3">
                  <span className="w-full text-center lg:text-left text-lg font-semibold truncate text-ellipsis">
                    Liabilities :
                  </span>
                  <SelectCategory
                    category={liabilityCategory}
                    setCategory={setLiabilityCategory}
                    categories={commonSizeCategories.liabilities}
                  />
                </div>
                <div className="flex flex-col h-auto w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  {liabilities.length !== 0 && (
                    <VisualiseTable
                      data={liabilities}
                      columns={liabilityColumns}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-3 lg:gap-3">
                <div className="flex flex-col items-center w-full lg:w-1/5 h-auto gap-3">
                  <span className="w-full text-center lg:text-left text-lg font-semibold truncate text-ellipsis">
                    Shareholder&apos;s Equity :
                  </span>
                  <SelectCategory
                    category={equityCategory}
                    setCategory={setEquityCategory}
                    categories={commonSizeCategories.shareholders_equity}
                  />
                </div>
                <div className="flex flex-col h-auto w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  {shareholdersEquity.length !== 0 && (
                    <VisualiseTable
                      data={shareholdersEquity}
                      columns={equityColumns}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full lg:w-5/6 h-auto gap-10">
              <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-3 lg:gap-3">
                <div className="flex flex-col items-center w-full lg:w-1/5 h-auto gap-3">
                  <span className="w-full text-center lg:text-left text-lg font-semibold truncate text-ellipsis">
                    Operating Income :
                  </span>
                  <SelectCategory
                    category={incomeCategory}
                    setCategory={setIncomeCategory}
                    categories={commonSizeCategories.operating_income}
                  />
                </div>
                <div className="flex flex-col h-auto w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  {operatingIncome.length !== 0 && (
                    <VisualiseTable
                      data={operatingIncome}
                      columns={incomeColumns}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-3 lg:gap-3">
                <div className="flex flex-col items-center w-full lg:w-1/5 h-auto gap-3">
                  <span className="w-full text-center lg:text-left text-lg font-semibold truncate text-ellipsis">
                    Operating Expense :
                  </span>
                  <SelectCategory
                    category={expenseCategory}
                    setCategory={setExpenseCategory}
                    categories={commonSizeCategories.operating_expenses}
                  />
                </div>
                <div className="flex flex-col h-auto w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  {operatingExpenses.length !== 0 && (
                    <VisualiseTable
                      data={operatingExpenses}
                      columns={expenseColumns}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="lg:sticky lg:top-14 w-full sm:w-auto lg:w-1/6 h-full">
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

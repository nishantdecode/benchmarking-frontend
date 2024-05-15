"use client";

import { useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { downloadImage, downloadPDF, downloadSheet } from "@/util/exportUtils";

import { Card } from "@/components/ui/card";

import {
  trendAnalysisCategories,
  trendTableCategories,
} from "@/app/data/categoryData";
import showToast from "@/util/showToast";
import { combineData } from "@/util/combineData";
import Header from "@/app/components/dashboard/trendAnalysis/header";
import { generateColumns } from "@/app/components/visualise/columns";
import { visualisationLabelUtils } from "@/util/visualizationLabelUtils";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import VisualiseBarChart from "@/app/components/visualise/visualiseBarChart";
import { useGetItemBankMutation } from "@/lib/features/services/analysisApi";
import { useGetRatioBankMutation } from "@/lib/features/services/keyRatioApi";
import VisualiseLineChart from "@/app/components/visualise/visualiseLineChart";
import { useGetTrendTableMutation } from "@/lib/features/services/individualBankApi";
import SelectCategory from "@/app/components/dashboard/trendAnalysis/selectCategory";
import VisualiseLineBarChart from "@/app/components/visualise/visualiseLineBarChart";

const TrendAndCompetitionAnalysis = () => {
  let ref = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [getItemBank] = useGetItemBankMutation();
  const [getRatioBank] = useGetRatioBankMutation();
  const [getTrendTable] = useGetTrendTableMutation();

  const banks = useSelector((state) => state.bank.banks);

  const [provision, setProvision] = useState([]);
  const [nim, setNim] = useState([]);
  const [cor, setCor] = useState([]);
  const [operatingIncome, setOperatingIncome] = useState([]);
  const [operatingExpense, setOperatingExpense] = useState([]);
  const [incomeExpense, setIncomeExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [table, setTables] = useState(null);

  const [bankLabel, setBankLabel] = useState({});
  const [category, setCategory] = useState(
    searchParams.get("category") || trendAnalysisCategories[0].value
  );
  const [checkedBanks, setCheckedBanks] = useState([]);

  const getTrendTableData = async ({ categories }) => {
    try {
      const bankIds = checkedBanks.map(
        (bank) => banks.find((item) => item.name === bank).id
      );
      const response = await getTrendTable({
        bankIds,
        categories,
      });
      if (response.data) {
        let arr = {...response.data.result};
        let result = {}
        Object.entries(arr).map(([key,value])=>{
          for (let item of value){
            let itemDemo = {}
            Object.entries(item).map(([innerKey,innerValue])=>{
              itemDemo[innerKey] = innerValue.toLocaleString()
            })
            if(result[key]){
              result[key].push(itemDemo)
            }else{
              result[key] = [itemDemo]
            }
          }        
        })
        console.log("TABLE",response.data,{arr})
        setTables(result);
      } else {
        setTables([]);
        showToast("No Data!", response.error.result);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const getRatioBankData = async ({ category, setData }) => {
    try {
      const bankIds = checkedBanks.map(
        (bank) => banks.find((item) => item.name === bank)?.id
      ).filter(id => id !== undefined);;
      const response = await getRatioBank({ bankIds, category });
      if (response.data) {
        setData(response.data.result);
        setBankLabel(visualisationLabelUtils(banks, response.data.result));
      } else {
        setData([]);
        showToast("No Data!", response.error.result);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const getItemBankData = async ({ table, category, setData }) => {
    try {
      const bankIds = checkedBanks.map(
        (bank) => banks.find((item) => item.name === bank)?.id
      ).filter(id => id !== undefined);;
      const response = await getItemBank({
        bankIds,
        table,
        category,
      });
      if (response.data) {
        console.log("TABLE",response.data)

        setData(response.data.result);
        setBankLabel(visualisationLabelUtils(banks, response.data.result));
      } else {
        setData([]);
        showToast("No Data!", response.error.result);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  useEffect(() => {
    if (category && checkedBanks.length !== 0)
      router.push(
        `/dashboard/overview/trendAnalysis?category=${category}&bank=${checkedBanks[0]}`
      );
  }, [category, checkedBanks]);

  useEffect(() => {
    if (category && checkedBanks.length !== 0) {
      if (category === "nim") {
        getRatioBankData({
          category: "nim",
          setData: setNim,
        });
      }
      if (category === "cor") {
        getRatioBankData({
          category: "cor",
          setData: setCor,
        });
      }
      if (category === "income") {
        getRatioBankData({
          category: "income",
          setData: setIncome,
        });
        getItemBankData({
          table: "incomeStatement",
          category: "operatingIncome",
          setData: setOperatingIncome,
        });
      }
    }
  }, [category, checkedBanks]);

  useEffect(() => {
    if (category && checkedBanks.length !== 0) {
      if (category === "income_before_provisions") {
        getItemBankData({
          table: "incomeStatement",
          category: "income_before_provisions",
          setData: setProvision,
        });
      }
      if (category === "investments") {
        getItemBankData({
          table: "balanceSheet",
          category: "investments",
          setData: setInvestments,
        });
      }
      if (category === "incomeExpense") {
        getItemBankData({
          table: "incomeStatement",
          category: "operatingIncome",
          setData: setOperatingIncome,
        });
      }
      if (category === "incomeExpense") {
        getItemBankData({
          table: "incomeStatement",
          category: "operatingExpenses",
          setData: setOperatingExpense,
        });
      }
      if (category === "totalDeposits") {
        const categories = [
          {
            table: "customerDeposit",
            value: "demandDeposits",
          },
          {
            table: "customerDeposit",
            value: "customerSavings",
          },
          {
            table: "customerDeposit",
            value: "customerTimeInvestment",
          },
        ];
        getTrendTableData({
          categories,
        });
      }
      if (category === "totalGrossLoans") {
        const categories = [
          {
            table: "retail",
            value: "gross",
          },
          {
            table: "corporate",
            value: "gross",
          },
          {
            table: "total",
            value: "gross",
          },
        ];
        getTrendTableData({
          categories,
        });
      }
    }
  }, [category, checkedBanks]);

  useEffect(() => {
    if (operatingIncome.length !== 0 && operatingExpense.length !== 0) {
      const { bankColorsLabel, combined } = combineData(
        banks,
        operatingIncome,
        operatingExpense
      );
      setBankLabel((prev) => {
        const updatedBankLabel = { ...prev, bankColorsLabel };
        return updatedBankLabel;
      });
      setIncomeExpense(combined);
    }
  }, [operatingIncome, operatingExpense]);

  useEffect(() => {
    if (banks) {
      const bank1 = searchParams.get("bank");
      const otherBanks = banks
        .filter((item) => item.name !== bank1)
        .map((item) => item.name);
      const data = [bank1, otherBanks.slice(0, 2)].flat();
      setCheckedBanks(data);
    }
  }, [banks]);

  return (
    <>
      <div className="flex justify-center items-center h-auto w-full mt-14 p-5 pl-7 sm:pl-10">
        <Card className="flex flex-col lg:flex-row h-auto w-full p-3 md:p-5 gap-3 lg:gap-5">
          <div className="lg:sticky lg:top-20 h-full w-full lg:w-1/5">
            <SelectCategory
              setCategory={setCategory}
              categories={trendAnalysisCategories}
              downloadPDF={() =>
                downloadPDF(
                  ref,
                  null,
                  null,
                  "Trend & Competitive Analysis",
                  `${
                    trendAnalysisCategories.find(
                      (item) => item.value === category
                    ).name
                  }`,
                  "#666"
                )
              }
              downloadImage={() =>
                downloadImage(
                  ref,
                  null,
                  null,
                  "Trend & Competitive Analysis",
                  `${
                    trendAnalysisCategories.find(
                      (item) => item.value === category
                    ).name
                  }`,
                  "#666"
                )
              }
              downloadSheet={() =>
                downloadSheet(
                  banks,
                  null,
                  category,
                  category === "totalGrossLoans"
                    ? ["retail", "corporate", "total"]
                    : [
                        "demandDeposits",
                        "customerSavings",
                        "customerTimeInvestment",
                      ],
                  Object.keys(table).map((item) => {
                    return table[item];
                  })
                )
              }
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-col h-full w-full lg:w-4/5 pb-10 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            <Header
              banks={banks}
              category={category}
              checkedBanks={checkedBanks}
              setCheckedBanks={setCheckedBanks}
              downloadPDF={() =>
                downloadPDF(
                  ref,
                  null,
                  null,
                  "Trend & Competitive Analysis",
                  `${
                    trendAnalysisCategories.find(
                      (item) => item.value === category
                    ).name
                  }`,
                  "#666"
                )
              }
              downloadImage={() =>
                downloadImage(
                  ref,
                  null,
                  null,
                  "Trend & Competitive Analysis",
                  `${
                    trendAnalysisCategories.find(
                      (item) => item.value === category
                    ).name
                  }`,
                  "#666"
                )
              }
              downloadSheet={() =>
                downloadSheet(
                  banks,
                  null,
                  category,
                  category === "totalGrossLoans"
                    ? ["retail", "corporate", "total"]
                    : [
                        "demandDeposits",
                        "customerSavings",
                        "customerTimeInvestment",
                      ],
                  Object.keys(table).map((item) => {
                    return table[item];
                  })
                )
              }
            />
            <div className="hidden sm:flex text-md sm:text-xl font-medium sm:font-bold">
              {
                trendAnalysisCategories.find((item) => item.value === category)
                  ?.name
              }
              :
            </div>
            {category === "income_before_provisions" ? (
              <div className="h-[400px] sm:h-[60vh] md:h-[80vh] my-10">
                {provision.length !== 0 && (
                  <VisualiseLineChart
                    ref={ref}
                    legend={true}
                    xAxis={true}
                    data={provision}
                    colors={bankLabel.bankColorsLabel}
                    dataFormatter={bankLabel.dataFormatterCurrency}
                  />
                )}
              </div>
            ) : category === "nim" ? (
              <div className="h-[400px] sm:h-[60vh] md:h-[80vh] my-10">
                {nim.length !== 0 && (
                  <VisualiseLineChart
                    ref={ref}
                    legend={true}
                    xAxis={true}
                    data={nim}
                    colors={bankLabel.bankColorsLabel}
                    dataFormatter={bankLabel.dataFormatterPercentage}
                  />
                )}
              </div>
            ) : category === "cor" ? (
              <div className="h-[400px] sm:h-[60vh] md:h-[80vh] my-10">
                {cor.length !== 0 && (
                  <VisualiseLineChart
                    ref={ref}
                    legend={true}
                    xAxis={true}
                    data={cor}
                    colors={bankLabel.bankColorsLabel}
                    dataFormatter={bankLabel.dataFormatterPercentage}
                  />
                )}
              </div>
            ) : category === "incomeExpense" ? (
              <div className="h-[400px] sm:h-[60vh] md:h-[80vh] my-10">
                {incomeExpense.length !== 0 && (
                  <VisualiseLineChart
                    ref={ref}
                    legend={true}
                    xAxis={true}
                    data={incomeExpense}
                    colors={bankLabel.bankColorsLabel}
                    dataFormatter={bankLabel.dataFormatterCurrency}
                  />
                )}
              </div>
            ) : category === "income" ? (
              <div className="h-[400px] sm:h-[60vh] md:h-[80vh] my-10">
                {income.length !== 0 && (
                  <VisualiseLineBarChart
                    ref={ref}
                    legend={true}
                    xAxis={true}
                    data1={income}
                    data2={operatingIncome}
                    banks={banks}
                  />
                )}
              </div>
            ) : category === "investments" ? (
              <div className="h-[400px] sm:h-[60vh] md:h-[80vh] my-10">
                {investments.length !== 0 && (
                  <VisualiseBarChart
                    ref={ref}
                    legend={true}
                    xAxis={true}
                    data={investments}
                    colors={bankLabel.bankColorsLabel}
                    dataFormatter={bankLabel.dataFormatterCurrency}
                  />
                )}
              </div>
            ) : (
              table &&
              Object.keys(table).map((category) => {
                const columns = generateColumns({ data: table[category] });
                const categoryName = trendTableCategories.find(
                  (item) => item.value === category
                ).name;
                return (
                  <div
                    key={category}
                    className="flex flex-col w-full pb-10 gap-1"
                  >
                    <div className="text-sm sm:text-lg font-medium">
                      {categoryName}:
                    </div>
                    <div>
                      <VisualiseTable
                        columns={columns}
                        data={table[category]}
                      />
                    </div>
                  </div>
                );
              })
            )}
            <div className="flex sm:hidden text-md sm:text-xl font-medium sm:font-bold py-4">
              {category}:
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TrendAndCompetitionAnalysis;

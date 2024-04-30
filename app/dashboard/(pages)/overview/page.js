"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useGetAllYearsMutation,
  useGetRatioBankMutation,
} from "@/lib/features/services/keyRatioApi";
import showToast from "@/util/showToast";
import SelectBank from "@/app/components/dashboard/selectBank";
import { visualisationLabelUtils } from "@/util/visualizationLabelUtils";
import CompetitionCards from "@/app/components/dashboard/competitionCards";
import CompetitionHeader from "@/app/components/dashboard/competitionHeader";
import VisualiseBarChart from "@/app/components/visualise/visualiseBarChart";
import { useGetItemBankMutation } from "@/lib/features/services/analysisApi";
import VisualiseLineChart from "@/app/components/visualise/visualiseLineChart";
import { useGetBankDataMutation, useGetCompetitionDataMutation } from "@/lib/features/services/individualBankApi";

const Dashboard = () => {
  const router = useRouter();

  const [getAllYears] = useGetAllYearsMutation();
  const [getItemBank] = useGetItemBankMutation();
  const [getRatioBank] = useGetRatioBankMutation();
  const [getBankData] = useGetBankDataMutation();
  const [getCompetition] = useGetCompetitionDataMutation();

  const [years, setYears] = useState([]);
  const [competition, setCompetition] = useState([]);
  const [provision, setProvision] = useState([]);
  const [nim, setNim] = useState([]);
  const [cor, setCor] = useState([]);
  const [operatingIncome, setOperatingIncome] = useState([]);
  const [operatingExpense, setOperatingExpense] = useState([]);
  const [incomeExpense, setIncomeExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [totalDeposits, setTotalDeposits] = useState([]);
  const [totalGrossLoans, setTotalGrossLoans] = useState([]);

  const banks = useSelector((state) => state.bank.banks);

  const [year, setYear] = useState("");
  const [bank, setBank] = useState("");

  const bankLabel =
    nim.length !== 0 && banks.length !== 0
      ? visualisationLabelUtils(banks, nim)
      : [];

  const getYears = async () => {
    try {
      const response = await getAllYears();
      if (response.data) {
        const data = response.data.result;
        setYears(data);
        setYear(data[data.length - 2].toString());
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const getCompetitionData = async () => {
    try {
      let response = await getCompetition({ year });
      if (response.data) {
        setCompetition(response.data.result);
      } else {
        setCompetition([]);
        showToast("No Data!", response.error.result);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const getRatioBankData = async ({ bankIds, category, setData }) => {
    try {
      const response = await getRatioBank({ bankIds, category });
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

  const getItemBankData = async ({ bankIds, table, category, setData }) => {
    try {
      const response = await getItemBank({ bankIds, table, category });
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

  const getBankLineData = async ({ bankId, table, category, setData }) => {
    try {
      const response = await getBankData({ bankId, table, category });
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
    getYears();
  }, []);

  useEffect(() => {
    if (banks && banks.length > 0) {
      setBank(banks[0].name);
    }
  }, [banks]);

  useEffect(() => {
    if (year) {
      getCompetitionData();
    }
  }, [year]);

  useEffect(() => {
    if (bank) {
      const bankId = banks.find((item) => item.name === bank).id;
      getRatioBankData({
        bankIds: [bankId],
        category: "nim",
        setData: setNim,
      });
      getRatioBankData({
        bankIds: [bankId],
        category: "cor",
        setData: setCor,
      });
      getRatioBankData({
        bankIds: [bankId],
        category: "income",
        setData: setIncome,
      });
    }
  }, [bank]);

  useEffect(() => {
    if (bank) {
      const bankId = banks.find((item) => item.name === bank).id;
      getItemBankData({
        bankIds: [bankId],
        table: "incomeStatement",
        category: "income_before_provisions",
        setData: setProvision,
      });
      getItemBankData({
        bankIds: [bankId],
        table: "balanceSheet",
        category: "investments",
        setData: setInvestments,
      });
      getItemBankData({
        bankIds: [bankId],
        table: "incomeStatement",
        category: "operatingIncome",
        setData: setOperatingIncome,
      });
      getItemBankData({
        bankIds: [bankId],
        table: "incomeStatement",
        category: "operatingExpenses",
        setData: setOperatingExpense,
      });
    }
  }, [bank]);

  useEffect(() => {
    if (bank) {
      const bankId = banks.find((item) => item.name === bank).id;
      getBankLineData({
        bankId,
        table: "customerDeposit",
        category: "totalDeposits",
        setData: setTotalDeposits,
      });
      getBankLineData({
        bankId,
        table: "total",
        category: "gross",
        setData: setTotalGrossLoans,
      });
    }
  }, [bank]);

  useEffect(() => {
    if (operatingIncome.length !== 0 && operatingExpense.length !== 0) {
      const combineData = () => {
        const combined = [];
        operatingIncome.forEach((incomeItem) => {
          const correspondingExpense = operatingExpense.find(
            (expenseItem) => expenseItem.label === incomeItem.label
          );
          if (correspondingExpense) {
            combined.push({
              label: incomeItem.label,
              [`${Object.keys(incomeItem)[1]} Income`]:
                incomeItem[Object.keys(incomeItem)[1]],
              [`${Object.keys(correspondingExpense)[1]} Expense`]:
                correspondingExpense[Object.keys(correspondingExpense)[1]],
            });
          }
        });
        return combined;
      };

      setIncomeExpense(combineData());
    }
  }, [operatingIncome, operatingExpense]);

  return (
    <div className="flex flex-col h-full w-full mt-14 p-5 pl-7 sm:pl-10 gap-5 lg:gap-10">
      <div className="flex flex-col justify-start items-start h-auto w-full gap-3">
        <CompetitionHeader years={years} year={year} setYear={setYear} />
        <CompetitionCards data={competition} />
      </div>

      <SelectBank banks={banks} bank={bank} setBank={setBank} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="flex flex-col p-4 sm:p-4 md:p-8">
          <CardHeader className="flex flex-row justify-between py-2 pb-4 px-0">
            <CardTitle className="text-lg md:text-xl">
              Income before Provisions
            </CardTitle>
            <Button
              size="sm"
              variant="secondary"
              className="px-3 sm:px-5 rounded-md sm:rounded-lg text-xs sm:text-md"
              onClick={() => {
                router.push(
                  `/dashboard/overview/trendAnalysis?category=income_before_provisions&bank=${bank}`
                );
              }}
            >
              View More
            </Button>
          </CardHeader>
          <div className="h-[250px] xs:h-[300px] md:h-[350px]">
            {provision.length !== 0 && (
              <VisualiseLineChart
                legend={true}
                xAxis={true}
                data={provision}
                colors={bankLabel.bankColorsLabel}
                dataFormatter={bankLabel.dataFormatterCurrency}
              />
            )}
          </div>
        </Card>
        <Card className="flex flex-col p-4 sm:p-4 md:p-8">
          <CardHeader className="flex flex-row justify-between py-2 pb-4 px-0">
            <CardTitle className="text-lg md:text-xl">NIM %</CardTitle>
            <Button
              size="sm"
              variant="secondary"
              className="px-3 sm:px-5 rounded-md sm:rounded-lg text-xs sm:text-md"
              onClick={() => {
                router.push(
                  `/dashboard/overview/trendAnalysis?category=nim&bank=${bank}`
                );
              }}
            >
              View More
            </Button>
          </CardHeader>
          <div className="h-[250px] xs:h-[300px] md:h-[350px]">
            {nim.length !== 0 && (
              <VisualiseLineChart
                legend={true}
                xAxis={true}
                data={nim}
                colors={bankLabel.bankColorsLabel}
                dataFormatter={bankLabel.dataFormatterPercentage}
              />
            )}
          </div>
        </Card>
        <Card className="flex flex-col p-4 sm:p-4 md:p-8">
          <CardHeader className="flex flex-row justify-between py-2 pb-4 px-0">
            <CardTitle className="text-lg md:text-xl">Cost of Risk %</CardTitle>
            <Button
              size="sm"
              variant="secondary"
              className="px-3 sm:px-5 rounded-md sm:rounded-lg text-xs sm:text-md"
              onClick={() => {
                router.push(
                  `/dashboard/overview/trendAnalysis?category=cor&bank=${bank}`
                );
              }}
            >
              View More
            </Button>
          </CardHeader>
          <div className="h-[250px] xs:h-[300px] md:h-[350px]">
            {cor.length !== 0 && (
              <VisualiseLineChart
                legend={true}
                xAxis={true}
                data={cor}
                colors={bankLabel.bankColorsLabel}
                dataFormatter={bankLabel.dataFormatterPercentage}
              />
            )}
          </div>
        </Card>
        <Card className="flex flex-col p-4 sm:p-4 md:p-8">
          <CardHeader className="flex flex-row justify-between py-2 pb-4 px-0">
            <CardTitle className="text-lg md:text-xl">
              Operating Income/Expense
            </CardTitle>
            <Button
              size="sm"
              variant="secondary"
              className="px-3 sm:px-5 rounded-md sm:rounded-lg text-xs sm:text-md"
              onClick={() => {
                router.push(
                  `/dashboard/overview/trendAnalysis?category=incomeExpense&bank=${bank}`
                );
              }}
            >
              View More
            </Button>
          </CardHeader>
          <div className="h-[250px] xs:h-[300px] md:h-[350px]">
            {incomeExpense.length !== 0 && (
              <VisualiseBarChart
                xAxis={true}
                data={incomeExpense}
                colors={bankLabel?.bankColorsLabel?.flatMap((value) => [
                  value,
                  null,
                ])}
                dataFormatter={bankLabel.dataFormatterCurrency}
              />
            )}
          </div>
        </Card>
        <Card className="flex flex-col p-4 sm:p-4 md:p-8">
          <CardHeader className="flex flex-row justify-between py-2 pb-4 px-0">
            <CardTitle className="text-lg md:text-xl">
              Cost of Income %
            </CardTitle>
            <Button
              size="sm"
              variant="secondary"
              className="px-3 sm:px-5 rounded-md sm:rounded-lg text-xs sm:text-md"
              onClick={() => {
                router.push(
                  `/dashboard/overview/trendAnalysis?category=income&bank=${bank}`
                );
              }}
            >
              View More
            </Button>
          </CardHeader>
          <div className="h-[250px] xs:h-[300px] md:h-[350px]">
            {income.length !== 0 && (
              <VisualiseLineChart
                legend={true}
                xAxis={true}
                data={income}
                colors={bankLabel.bankColorsLabel}
                dataFormatter={bankLabel.dataFormatterPercentage}
              />
            )}
          </div>
        </Card>
        <Card className="flex flex-col p-4 sm:p-4 md:p-8">
          <CardHeader className="flex flex-row justify-between py-2 pb-4 px-0">
            <CardTitle className="text-lg md:text-xl">Investments</CardTitle>
            <Button
              size="sm"
              variant="secondary"
              className="px-3 sm:px-5 rounded-md sm:rounded-lg text-xs sm:text-md"
              onClick={() => {
                router.push(
                  `/dashboard/overview/trendAnalysis?category=investments&bank=${bank}`
                );
              }}
            >
              View More
            </Button>
          </CardHeader>
          <div className="h-[250px] xs:h-[300px] md:h-[350px]">
            {investments.length !== 0 && (
              <VisualiseLineChart
                legend={true}
                xAxis={true}
                data={investments}
                colors={bankLabel.bankColorsLabel}
                dataFormatter={bankLabel.dataFormatterCurrency}
              />
            )}
          </div>
        </Card>
        <Card className="flex flex-col p-4 sm:p-4 md:p-8">
          <CardHeader className="flex flex-row justify-between py-2 pb-4 px-0">
            <CardTitle className="text-lg md:text-xl">Total Deposits</CardTitle>
            <Button
              size="sm"
              variant="secondary"
              className="px-3 sm:px-5 rounded-md sm:rounded-lg text-xs sm:text-md"
              onClick={() => {
                router.push(
                  `/dashboard/overview/trendAnalysis?category=totalDeposits&bank=${bank}`
                );
              }}
            >
              View More
            </Button>
          </CardHeader>
          <div className="h-[250px] xs:h-[300px] md:h-[350px]">
            {totalDeposits.length !== 0 && (
              <VisualiseLineChart
                legend={true}
                xAxis={true}
                data={totalDeposits}
                colors={bankLabel.bankColorsLabel}
                dataFormatter={bankLabel.dataFormatterCurrency}
              />
            )}
          </div>
        </Card>
        <Card className="flex flex-col p-4 sm:p-4 md:p-8">
          <CardHeader className="flex flex-row justify-between py-2 pb-4 px-0">
            <CardTitle className="text-lg md:text-xl">Total Gross Loans</CardTitle>
            <Button
              size="sm"
              variant="secondary"
              className="px-3 sm:px-5 rounded-md sm:rounded-lg text-xs sm:text-md"
              onClick={() => {
                router.push(
                  `/dashboard/overview/trendAnalysis?category=totalGrossLoans&bank=${bank}`
                );
              }}
            >
              View More
            </Button>
          </CardHeader>
          <div className="h-[250px] xs:h-[300px] md:h-[350px]">
            {totalGrossLoans.length !== 0 && (
              <VisualiseLineChart
                legend={true}
                xAxis={true}
                data={totalGrossLoans}
                colors={bankLabel.bankColorsLabel}
                dataFormatter={bankLabel.dataFormatterCurrency}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

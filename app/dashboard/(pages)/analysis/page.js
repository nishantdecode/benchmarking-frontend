"use client";

import { useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";

import {
  itemAnalysisCategories,
  keyRatioCategories,
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

import {
  useGetAllYearsMutation,
  useGetFiguresByCategoryMutation,
  useGetRatioMutation,
} from "@/lib/features/services/keyRatioApi";
import showToast from "@/util/showToast";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { SelectBanks } from "@/app/components/selectBanks";
import { downloadImage, downloadPDF } from "@/util/exportUtils";
import { SelectCategory } from "@/app/components/selectCategory";
import { generateColumns } from "@/app/components/visualise/columns";
import OptionButtons from "@/app/components/visualise/optionButtons";
import { visualisationLabelUtils } from "@/util/visualizationLabelUtils";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import VisualiseLineChart from "@/app/components/visualise/visualiseLineChart";
import { useGetItemByCategoryMutation } from "@/lib/features/services/analysisApi";

const AnalysisPage = () => {
  let ref = useRef();

  const break1 = useMediaQuery("(max-width: 1200px)");
  const break2 = useMediaQuery("(max-width: 1400px)");
  const break3 = useMediaQuery("(max-width: 1750px)");

  const [getRatio] = useGetRatioMutation();
  const [getAllYears] = useGetAllYearsMutation();
  const [getItemCategory] = useGetItemByCategoryMutation();
  const [getFiguresCategory] = useGetFiguresByCategoryMutation();
  const [years, setYears] = useState([]);

  const [ratio, setRatio] = useState([]);
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [msBalanceSheet, setMsBalanceSheet] = useState([]);
  const [incomeStatement, setIncomeStatement] = useState([]);
  const [msIncomeStatement, setMsIncomeStatement] = useState([]);
  const [figuresCategory, setFiguresCategory] = useState([]);

  const banks = useSelector((state) => state.bank.banks);
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(startDate.getFullYear() - 11)
  const [figureDateBalanceSheet, setFigureDateBalanceSheet] = useState({
    startDate,
    endDate
  });
  const [figureDateMSBalanceSheet, setFigureDateMSBalanceSheet] = useState({
    startDate,
    endDate
  });
  const [figureDateIncomeState, setFigureDateIncomeState] = useState({
    startDate,
    endDate
  });
  const [figureDateMSIncomeState, setFigureDateMSIncomeState] = useState({
    startDate,
    endDate
  });
  const [figureCategoryDate, setFigureCategoryDate] = useState({
    startDate,
    endDate
  });

  const [date, setDate] = useState({});
  const [checkedBanks, setCheckedBanks] = useState([]);
  const [analysis, setAnalysis] = useState("Balance Sheet/BN");

  const [ratioCategory, setRatioCategory] = useState(
    keyRatioCategories[0].name
  );
  const [balanceSheetCategory, setBalanceSheetCategory] = useState(
    itemAnalysisCategories.balanceSheet[0].name
  );
  const [msBalanceSheetCategory, setMsBalanceSheetCategory] = useState(
    itemAnalysisCategories.msBalanceSheet[0].name
  );
  const [incomeStatementCategory, setIncomeStatementCategory] = useState(
    itemAnalysisCategories.incomeStatement[0].name
  );
  const [msIncomeStatementCategory, setMsIncomeStatementCategory] = useState(
    itemAnalysisCategories.msIncomeStatement[0].name
  );

  let balanceSheetColumns = null;
  if (balanceSheet.length !== 0) {
    balanceSheetColumns = generateColumns({
      data: balanceSheet,
      initialType: "bank",
      type: "itemRank",
      banks,
    });
  }

  let msBalanceSheetColumns = null;
  if (msBalanceSheet.length !== 0) {
    msBalanceSheetColumns = generateColumns({
      data: msBalanceSheet,
      initialType: "bank",
      type: "ms",
      banks,
    });
  }

  let incomeStatementColumns = null;
  if (incomeStatement.length !== 0) {
    incomeStatementColumns = generateColumns({
      data: incomeStatement,
      initialType: "bank",
      type: "itemRank",
      banks,
    });
  }

  let msIncomeStatementColumns = null;
  if (msIncomeStatement.length !== 0) {
    msIncomeStatementColumns = generateColumns({
      data: msIncomeStatement,
      initialType: "bank",
      type: "ms",
      banks,
    });
  }

  let ratioColumns = null;
  if (figuresCategory.length !== 0) {
    ratioColumns = generateColumns({
      data: figuresCategory,
      initialType: "bank",
      banks,
    });
  }

  const ratioBankLabel =
    ratio.length !== 0 && banks.length !== 0
      ? visualisationLabelUtils(banks, ratio)
      : [];

  const getItemCategoryData = async ({
    table,
    setData,
    date,
    category,
    categories,
  }) => {
    const categoryValue = categories.find(
      (item) => item.name === category
    ).value;
    try {
      const response = await getItemCategory({
        table,
        category: categoryValue,
        startDate:date.startDate,
        endDate:date.endDate
      });
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

  const getRatioData = async () => {
    const bankIds = checkedBanks.map(
      (item) => banks?.find((bank) => bank.name === item).id
    );
    const category = keyRatioCategories
      .find((item) => (item.name === ratioCategory ? item.value : ""))
      .value.toString();
    const credentials = {
      category: category,
      bankIds: bankIds,
      interval: date.interval,
      startDate: date.startDate,
      endDate: date.endDate,
    };
    try {
      if (Object.keys(date).length !== 0) {
        const response = await getRatio(credentials);
        if (response.data) {
          setRatio(response.data.result);
        } else {
          setRatio([]);
          showToast("Error!", response.error.result);
        }
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const getFiguresCategoryData = async () => {
    const category = keyRatioCategories.find(
      (item) => item.name === ratioCategory
    ).value;
    try {
      const response = await getFiguresCategory({ category,startDate:figureCategoryDate.startDate,endDate:figureCategoryDate.endDate });
      if (response.data) {
        
        setFiguresCategory(response.data.result);
      } else {
        setFiguresCategory([]);
        showToast("Error!", response.error.result);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };


  useEffect(() => {
    getYears();
  }, []);

  const getYears = async () => {
    try {
      const response = await getAllYears();
      if (response.data) {
        setYears(response.data.result);

        setDate({
          interval: "YEARLY",
          startDate: new Date(`01/01/${response.data.result[0]}`),
          endDate: new Date(
            `01/01/${response.data.result[response.data.result.length - 1]}`
          ),
        });
      } else {
        setDate([]);
        showToast("Error!", response.error.result);
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
      setCheckedBanks(banks.map((bank) => bank.name));
    }
  }, [banks]);

  useEffect(() => {
    getRatioData();
  }, [date, ratioCategory, checkedBanks]);

  useEffect(() => {
    getFiguresCategoryData();
  }, [ratioCategory,figureCategoryDate]);

  useEffect(() => {
    getItemCategoryData({
      table: "balanceSheet",
      setData: setBalanceSheet,
      date:figureDateBalanceSheet,
      category: balanceSheetCategory,
      categories: itemAnalysisCategories.balanceSheet,
    });
  }, [balanceSheetCategory,figureDateBalanceSheet]);

  useEffect(() => {
    getItemCategoryData({
      table: "balanceSheet",
      setData: setMsBalanceSheet,
      date:figureDateMSBalanceSheet,
      category: msBalanceSheetCategory,
      categories: itemAnalysisCategories.msBalanceSheet,
    });
  }, [msBalanceSheetCategory,figureDateMSBalanceSheet]);

  useEffect(() => {
    getItemCategoryData({
      table: "incomeStatement",
      setData: setIncomeStatement,
      date:figureDateIncomeState,
      category: incomeStatementCategory,
      categories: itemAnalysisCategories.incomeStatement,
    });
  }, [incomeStatementCategory,figureDateIncomeState]);

  useEffect(() => {
    getItemCategoryData({
      table: "incomeStatement",
      setData: setMsIncomeStatement,
      date:figureDateMSIncomeState,
      category: msIncomeStatementCategory,
      categories: itemAnalysisCategories.msIncomeStatement,
    });
  }, [msIncomeStatementCategory,figureDateMSIncomeState]);

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
                {analysis}{" "}
                <IoIosArrowDown
                  className="text-secondary dark:text-primary"
                  size={23}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuRadioGroup
                value={analysis}
                onValueChange={(v) => {
                  setAnalysis(v);
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
            <div className="lg:sticky lg:top-14 h-auto w-full sm:w-auto lg:w-[16vw] 2xl:w-[18vw] lg:max-w-1/6">
              <SelectCategory
                height="h-[650px]"
                search={true}
                category={balanceSheetCategory}
                setCategory={setBalanceSheetCategory}
                categories={itemAnalysisCategories.balanceSheet}
              />
            </div>
            <div
              className={`flex flex-col h-auto w-full ${
                break1 ? "lg:w-[72vw]" : break2 ? "lg:w-[74vw]" : break3 ? "lg:w-[75vw]" : "lg:w-[78vw]"
              } lg:max-w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10`}
            >
              {balanceSheet.length !== 0 && (
                <VisualiseTable
                  value="value"
                  exportXls="true"
                  data={balanceSheet}
                  figureDate={figureDateBalanceSheet}
                  years={years}
                  setFigureDate = {setFigureDateBalanceSheet}
                  title={balanceSheetCategory}
                  columns={balanceSheetColumns}
                  exportData={[balanceSheet]}
                  sheetNames={["balanceSheet"]}
                  fileName="Item Analysis - Balance Sheet"
                />
              )}
            </div>
          </div>
        ) : analysis === "Income Statement/BN" ? (
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
            <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-[16vw] 2xl:w-[18vw] lg:max-w-1/6">
              <SelectCategory
                height="h-[650px]"
                search={true}
                category={incomeStatementCategory}
                setCategory={setIncomeStatementCategory}
                categories={itemAnalysisCategories.incomeStatement}
              />
            </div>
            <div
              className={`flex flex-col h-auto w-full ${
                break1 ? "lg:w-[72vw]" : break2 ? "lg:w-[74vw]" : break3 ? "lg:w-[75vw]" : "lg:w-[78vw]"
              } lg:max-w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10`}
            >
              {incomeStatement.length !== 0 && (
                <VisualiseTable
                  value="value"
                  years={years}

                  exportXls="true"
                  data={incomeStatement}
                  figureDate={figureDateIncomeState}
                  setFigureDate = {setFigureDateIncomeState}
                  title={incomeStatementCategory}
                  columns={incomeStatementColumns}
                  exportData={[incomeStatement]}
                  sheetNames={["incomeStatement"]}
                  fileName="Item Analysis - Income Statement"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center min-w-full gap-3">
            <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-[16vw] 2xl:w-[18vw] lg:max-w-1/6">
              <SelectCategory
                height="h-[650px]"
                search={true}
                category={ratioCategory}
                setCategory={setRatioCategory}
                categories={keyRatioCategories}
              />
            </div>
            <div
              className={`flex flex-col w-full ${
                break1 ? "lg:w-[72vw]" : break2 ? "lg:w-[74vw]" : break3 ? "lg:w-[75vw]" : "lg:w-[78vw]"
              } lg:max-w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-5`}
            >
              <div className="flex flex-col lg:flex-row w-full justify-center lg:justify-between items-center gap-5">
                <div className="hidden lg:flex text-xl font-semibold">
                  {ratioCategory} :
                </div>
                <OptionButtons
                  downloadImage={() =>
                    downloadImage(
                      ref,
                      banks,
                      checkedBanks,
                      "Item Analysis - Key Ratios",
                      `${ratioCategory}`,
                      "#666"
                    )
                  }
                  downloadPDF={() =>
                    downloadPDF(
                      ref,
                      banks,
                      checkedBanks,
                      "Item Analysis - Key Ratios",
                      `${ratioCategory}`,
                      "#666"
                    )
                  }
                  type="chart"
                />
              </div>
              <div className="flex flex-col lg:flex-row items-center h-full w-full gap-4">
                <div className="flex flex-col h-[300px] md:h-[600px] w-full lg:w-4/5 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                  {ratio.length !== 0 && (
                    <VisualiseLineChart
                      ref={ref}
                      xAxis={true}
                      data={ratio}
                      colors={ratioBankLabel.bankColorsLabel}
                      dataFormatter={ratioBankLabel.dataFormatterPercentage}
                    />
                  )}
                </div>
                <div className="lg:sticky lg:top-14 w-full sm:w-auto lg:w-1/5 h-full">
                  <SelectBanks
                    banks={banks}
                    checkedBanks={checkedBanks}
                    setCheckedBanks={setCheckedBanks}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
      {analysis === "Balance Sheet/BN" ? (
        <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
            <div className="lg:sticky lg:top-14 flex h-full w-full sm:w-auto lg:w-[16vw] 2xl:w-[18vw] lg:max-w-1/6">
              <SelectCategory
                height="h-[650px]"
                search={true}
                category={msBalanceSheetCategory}
                setCategory={setMsBalanceSheetCategory}
                categories={itemAnalysisCategories.msBalanceSheet}
              />
            </div>
            <div
              className={`flex flex-col h-auto w-full ${
                break1 ? "lg:w-[72vw]" : break2 ? "lg:w-[74vw]" : break3 ? "lg:w-[75vw]" : "lg:w-[78vw]"
              } lg:max-w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10`}
            >
              {msBalanceSheet.length !== 0 && (
                <VisualiseTable
                  value="share"
                  years={years}

                  exportXls="true"
                  data={msBalanceSheet}
                  figureDate={figureDateMSBalanceSheet}
                  setFigureDate = {setFigureDateMSBalanceSheet}
                  title={msBalanceSheetCategory}
                  columns={msBalanceSheetColumns}
                  exportData={[msBalanceSheet]}
                  sheetNames={["msBalanceSheet"]}
                  fileName="Item Analysis - Balance Sheet Market Share"
                />
              )}
            </div>
          </div>
        </Card>
      ) : analysis === "Income Statement/BN" ? (
        <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
            <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-[16vw] 2xl:w-[18vw] lg:max-w-1/6">
              <SelectCategory
                height="h-[650px]"
                search={true}
                category={msIncomeStatementCategory}
                setCategory={setMsIncomeStatementCategory}
                categories={itemAnalysisCategories.msIncomeStatement}
              />
            </div>
            <div
              className={`flex flex-col h-auto w-full ${
                break1 ? "lg:w-[72vw]" : break2 ? "lg:w-[74vw]" : break3 ? "lg:w-[75vw]" : "lg:w-[78vw]"
              } lg:max-w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10`}
            >
              {msIncomeStatement.length !== 0 && (
                <VisualiseTable
                  value="share"
                  years={years}

                  exportXls="true"
                  data={msIncomeStatement}
                  figureDate={figureDateIncomeState}
                  setFigureDate = {setMsIncomeStatement}
                  title={msIncomeStatementCategory}
                  columns={msIncomeStatementColumns}
                  exportData={[msIncomeStatement]}
                  sheetNames={["msIncomeStatement"]}
                  fileName="Item Analysis - Income Statement Market Share"
                />
              )}
            </div>
          </div>
        </Card>
      ) : (
        <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
            <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-[16vw] 2xl:w-[18vw] lg:max-w-1/6">
              <SelectCategory
                height="h-[650px]"
                search={true}
                category={ratioCategory}
                setCategory={setRatioCategory}
                categories={keyRatioCategories}
              />
            </div>
            <div
              className={`flex flex-col h-auto w-full ${
                break1 ? "lg:w-[72vw]" : break2 ? "lg:w-[74vw]" : break3 ? "lg:w-[75vw]" : "lg:w-[78vw]"
              } lg:max-w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10`}
            >
              {figuresCategory.length !== 0 && (
                <VisualiseTable
                  exportXls="true"
                  years={years}

                  data={figuresCategory}
                  figureDate={figureCategoryDate}
                  setFigureDate = {setFigureCategoryDate}
                  title={ratioCategory}
                  columns={ratioColumns}
                  exportData={[figuresCategory]}
                  sheetNames={["figuresCategory"]}
                  fileName="Item Analysis - Key Ratio"
                />
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalysisPage;

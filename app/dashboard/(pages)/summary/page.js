"use client";

import { useSelector } from "react-redux";
import React, { useRef, useEffect, useState } from "react";


import {
  keyRatioCategories,
  executiveSummaryCategories as summaryCategories,
} from "@/app/data/categoryData";

import { Card } from "@/components/ui/card";

import {
  useGetAllYearsMutation,
  useGetFiguresMutation,
  useGetItemMutation,
  useGetMetricQuery,
} from "@/lib/features/services/summaryApi";
import showToast from "@/util/showToast";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { ToggleBank } from "@/app/components/toggleBank";
import { SelectBanks } from "@/app/components/selectBanks";
import { downloadImage, downloadPDF } from "@/util/exportUtils";
import { SelectCategory } from "@/app/components/selectCategory";
import OptionButtons from "@/app/components/visualise/optionButtons";
import { generateColumns } from "@/app/components/visualise/columns";
import DataIntervalOptions from "@/app/components/dataIntervalOptions";
import { visualisationLabelUtils } from "@/util/visualizationLabelUtils";
import { useGetRatioMutation } from "@/lib/features/services/keyRatioApi";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import VisualiseLineChart from "@/app/components/visualise/visualiseLineChart";
import SarTable from "@/app/components/sarTable";
import SarFilter from "@/app/components/sarFilter";

const Summary = () => {
  let ref = useRef();

  const break1 = useMediaQuery("(max-width: 1270px)");

  const [getItem] = useGetItemMutation();
  const [getRatio] = useGetRatioMutation();
  const [getFigures] = useGetFiguresMutation();
  const [getAllYears] = useGetAllYearsMutation();

  const [item, setItem] = useState([]);
  const [ratio, setRatio] = useState([]);
  const [figures, setFigures] = useState([]);
  const [years, setYears] = useState([]);
  const [metric, setMetric] = useState([]);
  const [interval, setInterval] = useState('YEARLY');
  const [startPeriod, setStartPeriod] = useState('2020');
  const [endPeriod, setEndPeriod] = useState('2021');
  const [quarter, setQuarter] = useState("Q1");
  const [quarter2, setQuarter2] = useState("Q1");
  const [data, setData] = useState(null);
  const banks = useSelector((state) => state.bank.banks);

  const [bank, setBank] = useState(null);

  const [itemDate, setItemDate] = useState({});
  const [itemCheckedBanks, setItemCheckedBanks] = useState([]);
  const [itemCategory, setItemCategory] = useState(summaryCategories[0].name);

  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(startDate.getFullYear() - 11)
  const [figureDate, setFigureDate] = useState({
    startDate,
    endDate
  });

  const [ratioDate, setRatioDate] = useState({
    interval: 'YEARLY',
    startDate: new Date(Date.UTC(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)),
    endDate: new Date(Date.UTC(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)),
  });
  const [ratioCheckedBanks, setRatioCheckedBanks] = useState([]);
  const [ratioCategory, setRatioCategory] = useState(
    keyRatioCategories[0].name
  );

  const itemBankLabel =
    item.length !== 0 && banks.length !== 0
      ? visualisationLabelUtils(banks, item)
      : [];

  const ratioBankLabel =
    ratio.length !== 0 && banks.length !== 0
      ? visualisationLabelUtils(banks, ratio)
      : [];

  let columns = null;
  if (figures.length !== 0) {
    columns = generateColumns({
      data: figures,
    });
  }


  const replaceCategoryNames = (data) => {
    return data.map((item) => {
      const categoryInfo = summaryCategories.find(
        (category) => category.value === item.category
      );
      if (categoryInfo) {
        return {
          ...item,
          category: categoryInfo.name,
        };
      } else {
        return item;
      }
    });
  };

  const getFiguresData = async () => {
    const bankId = banks?.find((item) => item.name === bank)?.id;
    try {
      const response = await getFigures({ bankId, startDate: figureDate.startDate, endDate: figureDate.endDate });
      if (response.data) {
        const transformedData = replaceCategoryNames(response.data.result);
        setFigures(transformedData);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const getItemData = async () => {
    const bankIds = itemCheckedBanks.map(
      (item) => banks?.find((bank) => bank.name === item).id
    );
    const category = summaryCategories
      .find((item) => (item.name === itemCategory ? item.value : ""))
      .value.toString();
    const credentials = {
      category: category,
      bankIds: bankIds,
      interval: itemDate.interval,
      startDate: itemDate.startDate,
      endDate: itemDate.endDate,
    };
    try {
      if (Object.keys(itemDate).length !== 0) {
        const response = await getItem(credentials);
        if (response.data) {
          setItem(response.data.result);
        } else {
          showToast("Error!", response.error.result);
        }
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const getRatioData = async () => {
    const bankIds = ratioCheckedBanks.map(
      (item) => banks?.find((bank) => bank.name === item).id
    );
    const category = keyRatioCategories
      .find((item) => (item.name === ratioCategory ? item.value : ""))
      .value.toString();
    const credentials = {
      category: category,
      bankIds: bankIds,
      interval: ratioDate.interval,
      startDate: ratioDate.startDate,
      endDate: ratioDate.endDate,
    };
    try {
      if (Object.keys(ratioDate).length !== 0) {
        const response = await getRatio(credentials);
        if (response.data) {
          setRatio(response.data.result);
        } else {
          showToast("Error!", response.error.result);
        }
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const getYears = async () => {
    try {
      const response = await getAllYears();
      if (response.data) {
        setYears(response.data.result);
        setItemDate({
          interval: "YEARLY",
          startDate: new Date(`01/01/${response.data.result[0]}`),
          endDate: new Date(
            `01/01/${response.data.result[response.data.result.length - 2]}`
          ),
        });
        setRatioDate({
          interval: "YEARLY",
          startDate: new Date(`01/01/${response.data.result[0]}`),
          endDate: new Date(
            `01/01/${response.data.result[response.data.result.length - 2]}`
          ),
        });
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  // const fetchData = async () => {
  //   const url = `https://analytic.benchmarking.brihatinfotech.com/api/executiveSummary/metric?interval=${interval}&startPeriod=${interval === 'QUARTERLY' ? `Q1 ${startPeriod}` : startPeriod
  //     }&endPeriod=${interval === 'QUARTERLY' ? `Q1 ${endPeriod}` : endPeriod}`;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setData(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_ENV === "DEV" ? process.env.NEXT_PUBLIC_DEV_ANALYTICS_API : process.env.NEXT_PUBLIC_PROD_ANALYTICS_API}/executiveSummary/metric?interval=${interval}&startPeriod=${interval === 'QUARTERLY' ? `${quarter} ${startPeriod}` : startPeriod
      }&endPeriod=${interval === 'QUARTERLY' ? `${quarter2} ${endPeriod}` : endPeriod}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [interval, startPeriod, endPeriod, quarter]);

  // useEffect(() => {
  //   fetchData();
  // }, [interval, startPeriod, endPeriod]);

  useEffect(() => {
    getYears();
  }, []);

  useEffect(() => {
    if (bank) {
      getFiguresData();
    }
  }, [bank, banks, figureDate]);

  useEffect(() => {
    if (banks && banks.length > 0) {
      setBank(banks[0].name);
      setItemCheckedBanks(banks.map((bank) => bank.name));
      setRatioCheckedBanks(banks.map((bank) => bank.name));
    }
  }, [banks]);

  useEffect(() => {
    getItemData();
  }, [itemDate, itemCategory, itemCheckedBanks]);

  useEffect(() => {
    getRatioData();
  }, [ratioDate, ratioCategory, ratioCheckedBanks]);

  console.log(data)
  console.log(years)
  console.log(quarter2)
  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col items-center w-full h-auto p-3 md:p-5 gap-3 md:gap-5">
        <div className="flex flex-col lg:flex-row justify-between items-center min-w-full gap-3">
          <span className="w-auto lg:w-1/6 text-2xl font-bold mt-2 truncate text-ellipsis">
            Items
          </span>
          <div className="w-full lg:w-4/6 text-xs sm:text-sm font-medium">
            <DataIntervalOptions
              years={years}
              date={itemDate}
              setDate={setItemDate}
              category={itemCategory}
            />
          </div>
          <div className="flex justify-center lg:justify-end w-full lg:w-1/6">
            <OptionButtons
              type="chart"
              downloadPDF={() =>
                downloadPDF(
                  ref,
                  banks,
                  itemCheckedBanks,
                  "Executive Summary - Item",
                  `${itemCategory}  ${itemDate.startDate.getFullYear()} - ${itemDate.endDate.getFullYear()}`,
                  "#666"
                )
              }
              downloadImage={() =>
                downloadImage(
                  ref,
                  banks,
                  itemCheckedBanks,
                  "Executive Summary - Item",
                  `${itemCategory}  ${itemDate.startDate.getFullYear()} - ${itemDate.endDate.getFullYear()}`,
                  "#666"
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-14 lg:gap-2">
          <div className="lg:sticky lg:top-20 w-full sm:w-auto lg:w-1/6 h-auto">
            <SelectCategory
              category={itemCategory}
              setCategory={setItemCategory}
              categories={summaryCategories}
            />
          </div>
          <div className="flex flex-col h-[300px] md:h-[600px] w-full lg:w-4/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            {item.length !== 0 && (
              <VisualiseLineChart
                ref={ref}
                data={item}
                xAxis={true}
                colors={itemBankLabel.bankColorsLabel}
              />
            )}
          </div>
          <div className="lg:sticky lg:top-14 w-full sm:w-auto lg:w-1/6 h-full">
            <SelectBanks
              banks={banks}
              checkedBanks={itemCheckedBanks}
              setCheckedBanks={setItemCheckedBanks}
            />
          </div>
        </div>
      </Card>
      <Card className="flex flex-col items-center h-auto w-full p-3 md:p-5 gap-3 md:gap-5">
        <div className="flex flex-col lg:flex-row justify-between items-center min-w-full gap-3">
          <span className="w-auto lg:w-1/6 text-2xl font-bold mt-2 truncate text-ellipsis">
            Key Ratios
          </span>
          <div className="w-full lg:w-4/6 text-xs sm:text-sm font-medium">
            <DataIntervalOptions
              years={years}
              date={ratioDate}
              setDate={setRatioDate}
              category={ratioCategory}
            />
          </div>
          <div className="flex justify-center lg:justify-end w-full lg:w-1/6">
            <OptionButtons
              type="chart"
              downloadPDF={() =>
                downloadPDF(
                  ref,
                  banks,
                  ratioCheckedBanks,
                  "Executive Summary - Key Ratios",
                  `${ratioCategory}  ${ratioDate.startDate.getFullYear()} - ${ratioDate.endDate.getFullYear()}`,
                  "#666"
                )
              }
              downloadImage={() =>
                downloadImage(
                  ref,
                  banks,
                  ratioCheckedBanks,
                  "Executive Summary - Key Ratios",
                  `${ratioCategory}  ${ratioDate.startDate.getFullYear()} - ${ratioDate.endDate.getFullYear()}`,
                  "#666"
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-14 lg:gap-2">
          <div className="lg:sticky lg:top-20 w-full sm:w-auto lg:w-1/6 h-auto">
            <SelectCategory
              category={ratioCategory}
              setCategory={setRatioCategory}
              categories={keyRatioCategories}
            />
          </div>
          <div className="flex flex-col h-[300px] md:h-[600px] w-full lg:w-4/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
            {ratio.length !== 0 && (
              <VisualiseLineChart
                ref={ref}
                data={ratio}
                xAxis={true}
                colors={ratioBankLabel.bankColorsLabel}
                dataFormatter={ratioBankLabel.dataFormatterPercentage}
              />
            )}
          </div>
          <div className="lg:sticky lg:top-14 w-full sm:w-auto lg:w-1/6 h-full">
            <SelectBanks
              banks={banks}
              checkedBanks={ratioCheckedBanks}
              setCheckedBanks={setRatioCheckedBanks}
            />
          </div>
        </div>
      </Card>
      {
        //    <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
        //    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
        //      <div className="flex flex-col justify-center items-center lg:items-start h-full w-full sm:w-auto lg:w-[25vw] lg:max-w-1/6 gap-7">
        //        <span className="text-lg lg:text-2xl font-bold truncate text-ellipsis">
        //          Figures
        //        </span>
        //        <ToggleBank data={banks} bank={bank} setBank={setBank} />
        //      </div>
        //      <div className={`flex flex-col h-auto w-full ${break1 ? "lg:w-[69vw]" : "lg:w-[75vw]"} lg:max-w-5/6  gap-2 sm:gap-3 md:gap-8 lg:gap-10`}>
        //        {figures.length !== 0 && (
        //          <VisualiseTable
        //            search="true"
        //            exportXls="true"
        //            title={bank}
        //            width={10}
        //            data={figures}
        //            figureDate={figureDate}
        //            setFigureDate={setFigureDate}
        //            years={years}
        //            columns={columns}
        //            exportData={[figures]}
        //            sheetNames={["figures"]}
        //            fileName="Executive Summary Figures"
        //          />
        //        )}
        //      </div>
        //    </div>
        //  </Card>
      }

      {/* <Card className="flex flex-col h-auto w-full p-3 gap-5">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className={`flex flex-col h-auto w-full  `}>
            <div className="w-full lg:w-4/6 text-xs sm:text-sm font-medium">
              <div className="flex justify-end items-end">
                <SarFilter interval={interval}
                  setInterval={setInterval}
                  startPeriod={startPeriod}
                  setStartPeriod={setStartPeriod}
                  endPeriod={endPeriod}
                  setEndPeriod={setEndPeriod} />
              </div>

            </div>
            <div className="App">
              <h1>Bank Performance Comparison</h1>
              <div className="relative max-h-[500px] lg:max-h-[650px] rounded-md border overflow-scroll">
                <SarTable data={data} interval={interval} startPeriod={startPeriod} endPeriod={endPeriod} />
              </div>
            </div>
          </div>
        </div >
      </Card > */}

      <Card className="flex flex-col h-auto w-full p-3 gap-5">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className={`flex flex-col h-auto w-full`}>
            <div className="w-full lg:w-4/6 text-xs sm:text-sm font-medium">
              <div className="flex justify-end items-end">
                <SarFilter
                  interval={interval}
                  setInterval={setInterval}
                  startPeriod={startPeriod}
                  setStartPeriod={setStartPeriod}
                  endPeriod={endPeriod}
                  setEndPeriod={setEndPeriod}
                  quarter={quarter}
                  setQuarter={setQuarter}
                  quarter2={quarter2}
                  setQuarter2={setQuarter2}
                  years={years}
                />
              </div>
            </div>
            <div className="App">
              <div>
                <span className="w-auto lg:w-1/6 text-2xl font-bold mt-2 truncate text-ellipsis">Bank Performance Comparison</span>
              </div>
              <div className="relative max-h-[500px] lg:max-h-[650px] rounded-md border overflow-scroll">
                <SarTable
                  data={data}
                  interval={interval}
                  startPeriod={startPeriod}
                  endPeriod={endPeriod}
                  quarter={quarter}
                  quarter2={quarter2}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div >
  );
};

export default Summary;

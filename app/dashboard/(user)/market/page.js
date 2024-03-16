"use client";

import { useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";

import { marketShareCategories } from "@/app/data/categoryData";

import { Card } from "@/components/ui/card";

import {
  useGetAllYearsMutation,
  useGetIndividualBankDataMutation,
  useGetMultipleBankDataMutation,
} from "@/lib/features/services/marketApi";
import showToast from "@/util/showToast";
import generateMarketData from "@/util/marketDataUtils";
import { ToggleBank } from "@/app/components/toggleBank";
import { SelectBanks } from "@/app/components/selectBanks";
import { generateColumns } from "@/app/components/visualise/columns";
import OptionButtons from "@/app/components/visualise/optionButtons";
import { SelectCategory } from "@/app/components/selectCategory";
import { DonutPagination } from "@/app/components/market/donutPagination";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import { downloadImage, downloadPDF } from "@/util/exportUtils";
import VisualiseDonutChart from "@/app/components/visualise/visualiseDonutChart";

const Market = () => {
  let ref = useRef();

  const [getAllYears] = useGetAllYearsMutation();
  const [getMultipleBankData] = useGetMultipleBankDataMutation();
  const [getIndividualBankData] = useGetIndividualBankDataMutation();

  const [years, setYears] = useState([]);
  const [multipleMSData, setMultipleMSData] = useState([]);
  const [individualMSData, setIndividualMSData] = useState([]);

  const banks = useSelector((state) => state.bank.banks);

  const [color, setColor] = useState("");
  const [bank, setBank] = useState(null);
  const [year, setYear] = useState(null);
  const [checkedBanks, setCheckedBanks] = useState([]);
  const [category, setCategory] = useState(marketShareCategories[0].name);

  let columns = null;
  if (individualMSData.length !== 0) {
    columns = generateColumns({
      data: individualMSData,
      type: "progress",
      color: color,
      banks,
    });
  }

  let marketData = null;
  if (multipleMSData.length !== 0) {
    marketData = generateMarketData(banks, multipleMSData, checkedBanks);
  }

  const getYears = async () => {
    try {
      const response = await getAllYears();
      if (response.data) {
        const data = response.data.result;
        setYear(data[data.length - 1]);
        setYears(data);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const replaceCategoryNames = (data) => {
    return data.map((item) => {
      const newItem = {};
      for (const key in item) {
        const category = marketShareCategories.find((cat) => cat.value === key);
        if (category) {
          newItem[category.name] = item[key];
        } else {
          newItem[key] = item[key];
        }
      }
      return newItem;
    });
  };

  const getIndividualBankMSData = async () => {
    const credentials = {
      bankId: banks?.find((item) => item.name === bank).id,
    };
    try {
      const response = await getIndividualBankData(credentials);
      if (response.data) {
        const transformedData = replaceCategoryNames(response.data.result);
        setIndividualMSData(transformedData);
      } else {
        setIndividualMSData([]);
        showToast("Error!", response.error.result);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const getMultipleBankMSData = async () => {
    const credentials = {
      year,
      category: marketShareCategories.find((item) => item.name === category)
        .value,
    };
    try {
      const response = await getMultipleBankData(credentials);
      if (response.data) {
        setMultipleMSData(response.data.result);
      } else {
        setMultipleMSData([]);
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
    if (bank) {
      getIndividualBankMSData();
      setColor(banks.find((item) => item.name === bank).color);
    }
  }, [bank, banks]);

  useEffect(() => {
    if (checkedBanks && year) {
      getMultipleBankMSData();
    }
  }, [category, checkedBanks, year]);

  useEffect(() => {
    if (banks && banks.length > 0) {
      setBank(banks[0].name);
      setCheckedBanks(banks.map((bank) => bank.name));
    }
  }, [banks]);

  return (
    <div className="flex flex-col justify-center items-start h-auto w-screen overflow-clip mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className="flex flex-col justify-center items-center lg:items-start h-full w-full sm:w-auto lg:w-1/6 gap-7">
            <span className="text-lg lg:text-2xl font-bold truncate text-ellipsis">
              Individual Bank
            </span>
            <ToggleBank data={banks} bank={bank} setBank={setBank} />
          </div>
          <div className="flex flex-col h-auto w-full lg:max-w-5/6 gap-2 overflow-scroll sm:gap-3 md:gap-8 lg:gap-10">
            {individualMSData.length !== 0 && (
              <VisualiseTable
                title={bank}
                columns={columns}
                exportXls="true"
                data={individualMSData}
              />
            )}
          </div>
        </div>
      </Card>
      <Card className="flex flex-col items-center w-full h-auto p-3 md:p-5 gap-3 md:gap-5">
        <div className="flex flex-col lg:flex-row justify-between items-center min-w-full gap-3">
          <span className="w-auto lg:w-1/6 text-2xl font-bold mt-2 truncate text-ellipsis">
            Comparision
          </span>
          <div className="flex justify-start w-full lg:w-4/6 text-xs sm:text-sm font-medium">
            <span className="text-lg lg:text-sm font-medium truncate text-ellipsis">
              {category}
            </span>
          </div>
          <div className="flex justify-center lg:justify-end w-full lg:w-1/6">
            <OptionButtons
              type="chart"
              downloadPDF={() => downloadPDF(ref)}
              downloadImage={() => downloadImage(ref)}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-14 lg:gap-2">
          <div className="lg:sticky lg:top-20 w-full sm:w-auto lg:w-1/6 h-auto">
            <SelectCategory
              category={category}
              setCategory={setCategory}
              categories={marketShareCategories}
            />
          </div>
          <div className="flex flex-col justify-center items-center h-[300px] xs:h-[400] md:h-[500px] w-full lg:w-4/6 md:mt-10 gap-5 md:gap-8 lg:gap-10">
            {marketData && (
              <VisualiseDonutChart ref={ref} marketData={marketData} />
            )}
            <DonutPagination years={years} year={year} setYear={setYear} />
          </div>
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

export default Market;

"use client";

import { useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";

import { keyRatioCategories } from "@/app/data/categoryData";

import { Card } from "@/components/ui/card";

import {
  useGetAllYearsMutation,
  useGetFiguresMutation,
  useGetRatioMutation,
} from "@/lib/features/services/keyRatioApi";
import showToast from "@/util/showToast";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { ToggleBank } from "@/app/components/toggleBank";
import { SelectBanks } from "@/app/components/selectBanks";
import { downloadImage, downloadPDF } from "@/util/exportUtils";
import { SelectCategory } from "@/app/components/selectCategory";
import { generateColumns } from "@/app/components/visualise/columns";
import OptionButtons from "@/app/components/visualise/optionButtons";
import DataIntervalOptions from "@/app/components/dataIntervalOptions";
import { visualisationLabelUtils } from "@/util/visualizationLabelUtils";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";
import VisualiseLineChart from "@/app/components/visualise/visualiseLineChart";

const Ratio = () => {
  let ref = useRef();

  const break1 = useMediaQuery("(max-width: 1200px)");
  const break2 = useMediaQuery("(max-width: 1400px)");
  const break3 = useMediaQuery("(max-width: 1750px)");

  const [getRatio] = useGetRatioMutation();
  const [getFigures] = useGetFiguresMutation();
  const [getAllYears] = useGetAllYearsMutation();

  const [ratio, setRatio] = useState([]);
  const [figures, setFigures] = useState([]);
  const [years, setYears] = useState([]);

  const banks = useSelector((state) => state.bank.banks);

  const [bank, setBank] = useState(null);
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(startDate.getFullYear() - 11)
  const [figureDate, setFigureDate] = useState({
    startDate,
    endDate
  });
  const [date, setDate] = useState({});
  const [checkedBanks, setCheckedBanks] = useState([]);
  const [category, setCategory] = useState(keyRatioCategories[0].name);

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
      const categoryInfo = keyRatioCategories.find(
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
      const response = await getFigures({ bankId,startDate:figureDate.startDate,endDate:figureDate.endDate });
      if (response.data) {
        const transformedData = replaceCategoryNames(response.data.result);
        setFigures(transformedData);
      } else {
        setFigures([]);
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
    const ratioCategory = keyRatioCategories
      .find((item) => (item.name === category ? item.value : ""))
      .value.toString();
    const credentials = {
      category: ratioCategory,
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
          showToast("No Data!", response.error.result);
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
        setDate({
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

  useEffect(() => {
    getYears();
  }, []);

  useEffect(() => {
    if (bank) {
      getFiguresData();
    }
  }, [bank, banks,figureDate]);

  useEffect(() => {
    if (banks && banks.length > 0) {
      setBank(banks[0].name);
      setCheckedBanks(banks.map((bank) => bank.name));
    }
  }, [banks]);

  useEffect(() => {
    getRatioData();
  }, [date, category, checkedBanks]);

  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10 gap-10">
      <Card className="flex flex-col items-center w-full h-auto p-3 md:p-5 gap-3 md:gap-5">
        <div className="flex flex-col lg:flex-row justify-between items-center min-w-full gap-3">
          <span className="w-auto lg:w-1/6 text-2xl font-bold mt-2 truncate text-ellipsis">
            Key Ratios
          </span>
          <div className="w-full lg:w-4/6 text-xs sm:text-sm font-medium">
            <DataIntervalOptions
              years={years}
              date={date}
              setDate={setDate}
              category={category}
            />
          </div>
          <div className="flex justify-center lg:justify-end w-full lg:w-1/6">
            <OptionButtons
              type="chart"
              downloadPDF={() =>
                downloadPDF(
                  ref,
                  banks,
                  checkedBanks,
                  "Key Ratios",
                  `${category}  ${date.startDate.getFullYear()} - ${date.endDate.getFullYear()}`,
                  "#666"
                )
              }
              downloadImage={() =>
                downloadImage(
                  ref,
                  banks,
                  checkedBanks,
                  "Key Ratios",
                  `${category}  ${date.startDate.getFullYear()} - ${date.endDate.getFullYear()}`,
                  "#666"
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-14 lg:gap-2">
          <div className="lg:sticky lg:top-20 h-auto w-full sm:w-auto lg:w-1/6">
            <SelectCategory
              category={category}
              setCategory={setCategory}
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
          <div className="lg:sticky lg:top-14 h-full w-full sm:w-auto lg:w-1/6">
            <SelectBanks
              banks={banks}
              checkedBanks={checkedBanks}
              setCheckedBanks={setCheckedBanks}
            />
          </div>
        </div>
      </Card>
      <Card className="flex flex-col h-auto w-full p-3 md:p-5 gap-5 lg:gap-10">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-5">
          <div className="flex flex-col justify-center items-center lg:items-start h-full w-full sm:auto lg:w-[17vw] 2xl:w-[20vw] lg:max-w-1/6 gap-7">
            <span className="text-lg lg:text-2xl font-bold truncate text-ellipsis">
              Individual Bank
            </span>
            <ToggleBank data={banks} bank={bank} setBank={setBank} />
          </div>
          <div
            className={`flex flex-col h-auto w-full ${
              break1
                ? "lg:w-[72vw]"
                : break2
                ? "lg:w-[74vw]"
                : break3
                ? "lg:w-[75vw]"
                : "lg:w-[78vw]"
            } lg:max-w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10`}
          >
            {figures.length !== 0 && (
              <VisualiseTable
                search="true"
                exportXls="true"
                title={bank}
                data={figures}
                years={years}
                figureDate={figureDate}
                setFigureDate={setFigureDate}
                columns={columns}
                exportData={[figures]}
                sheetNames={["figures"]}
                fileName="Key Ratio Figures"
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Ratio;

"use client";

import { useSelector } from "react-redux";
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useState, useEffect } from "react";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import { IoIosArrowDown } from "react-icons/io";
import { commonSizeCategories } from "@/app/data/categoryData";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import showToast from "@/util/showToast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { ToggleBank } from "@/app/components/toggleBank";
import { generateColumns } from "@/app/components/visualise/columns";
import { useGetSizeByBankMutation } from "@/lib/features/services/sizeApi";
import { VisualiseTable } from "@/app/components/visualise/visualiseTable";

const SingleBankPage = () => {
  const break1 = useMediaQuery("(max-width: 1310px)");

  const [getSizeByBank] = useGetSizeByBankMutation();

  const [individualBankSize, setIndividualBankSize] = useState(null);

  const banks = useSelector((state) => state.bank.banks);

  const [size, setSize] = useState("Balance Sheet");
  const [bank, setBank] = useState(null);
  const [color, setColor] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dohnlambm",
    },
  });
  const myImage = cld.image(iconUrl);

  let assetsColumns = null;
  let liabilityColumns = null;
  let equityColumns = null;
  let incomeColumns = null;
  let expenseColumns = null;
  if (individualBankSize) {
    assetsColumns = generateColumns({
      data: individualBankSize.assets,
      type: "progress",
      color: color,
      banks,
    });

    liabilityColumns = generateColumns({
      data: individualBankSize.liabilities,
      type: "progress",
      color: color,
      banks,
    });

    equityColumns = generateColumns({
      data: individualBankSize.shareholders_equity,
      type: "progress",
      color: color,
      banks,
    });

    incomeColumns = generateColumns({
      data: individualBankSize.operating_income,
      type: "progress",
      color: color,
      banks,
    });

    expenseColumns = generateColumns({
      data: individualBankSize.operating_expenses,
      type: "progress",
      color: color,
      banks,
    });
  }

  const replaceCategoryNames = (data, categories) => {
    return data.map((item) => {
      const newItem = {};
      for (const key in item) {
        const category = categories.find((cat) => cat.value === key);
        if (category) {
          newItem[category.name] = item[key];
        } else {
          newItem[key] = item[key];
        }
      }
      return newItem;
    });
  };

  const getIndividualBankData = async () => {
    const bankId = banks?.find((item) => item.name === bank)?.id;
    try {
      const response = await getSizeByBank({ bankId });
      if (response.data) {
        let data = response.data.result;
        let transformedData = {};
        for (const item of Object.keys(data)) {
          transformedData[item] = replaceCategoryNames(
            data[item],
            commonSizeCategories[item]
          );
        }
        setIndividualBankSize(transformedData);
      } else {
        setIndividualBankSize(null);
        showToast("No Data!", undefined);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  useEffect(() => {
    if (bank) {
      getIndividualBankData();
    }
  }, [bank]);

  useEffect(() => {
    if (banks && banks.length > 0) {
      setBank(banks[0].name);
    }
  }, [banks]);

  useEffect(() => {
    if (bank) {
      setColor(banks.find((item) => item.name === bank).color);
      setIconUrl(banks.find((item) => item.name === bank).iconUrl);
    }
  }, [bank, banks]);

  return (
    <div className="flex flex-col justify-center items-start w-full h-auto mt-14 p-5 pl-7 sm:pl-10">
      <Card className="flex flex-col lg:flex-row h-auto w-full p-3 md:p-5 gap-3 lg:gap-2">
        <div className="lg:sticky lg:top-14 flex flex-col justify-start items-center h-full w-full lg:w-[23vw] lg:max-w-1/6 pr-2 gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="toggleActive"
                className="flex justify-between text-xl gap-2 py-6 rounded-xl font-bold w-full sm:w-[200px] lg:w-full"
              >
                {size} <IoIosArrowDown className="text-primary" size={25} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 p-2">
              <DropdownMenuRadioGroup
                value={size}
                onValueChange={(v) => setSize(v)}
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
          <ToggleBank data={banks} bank={bank} setBank={setBank} />
        </div>
        {size === "Balance Sheet" ? (
          <div className={`flex flex-col h-auto w-full ${break1 ? "lg:w-[67vw]" : "lg:w-[75vw]"} lg:max-w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10`}>
            <div className="h-auto w-full">
              {individualBankSize && (
                <VisualiseTable
                  title={
                    <div className="flex flex-row gap-2">
                      <div className="text-xl font-semibold">Assets : </div>
                      <AdvancedImage
                        className="w-8 h-8 object-cover rounded-full bg-white"
                        cldImg={myImage}
                        plugins={[responsive(), placeholder()]}
                      />
                      <span className="text-xl truncate text-ellipsis">
                        {bank}
                      </span>
                    </div>
                  }
                  navigate={true}
                  exportXls="true"
                  data={individualBankSize.assets}
                  columns={assetsColumns}
                  fileName="Common Size Individual Bank"
                  sheetNames={[
                    "assets",
                    "liabilities",
                    "shareholdersEquity",
                    "operatingIncome",
                    "operatingExpense",
                  ]}
                  exportData={Object.keys(individualBankSize).map((item) => {
                    return individualBankSize[item];
                  })}
                />
              )}
            </div>
            <div className="h-auto w-full">
              {individualBankSize && (
                <VisualiseTable
                  title={
                    <div className="flex flex-row gap-2">
                      <div className="text-xl font-semibold">Liabilities :</div>
                      <AdvancedImage
                        className="w-8 h-8 object-cover rounded-full bg-white"
                        cldImg={myImage}
                        plugins={[responsive(), placeholder()]}
                      />
                      <span className="text-xl truncate text-ellipsis">
                        {bank}
                      </span>
                    </div>
                  }
                  columns={liabilityColumns}
                  data={individualBankSize.liabilities}
                />
              )}
            </div>
            <div className="h-auto w-full">
              {individualBankSize && (
                <VisualiseTable
                  title={
                    <div className="flex flex-row gap-2">
                      <div className="text-xl font-semibold">
                        Shareholder&apos;s Equity :
                      </div>
                      <AdvancedImage
                        className="w-8 h-8 object-cover rounded-full bg-white"
                        cldImg={myImage}
                        plugins={[responsive(), placeholder()]}
                      />
                      <span className="text-xl truncate text-ellipsis">
                        {bank}
                      </span>
                    </div>
                  }
                  columns={equityColumns}
                  data={individualBankSize.shareholders_equity}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={`flex flex-col h-auto w-full ${break1 ? "lg:w-[67vw]" : "lg:w-[75vw]"} lg:max-w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10`}>
            <div className="h-auto w-full">
              {individualBankSize && (
                <VisualiseTable
                  title={
                    <div className="flex flex-row gap-2">
                      <div className="text-xl font-semibold">
                        Operating Income :{" "}
                      </div>
                      <AdvancedImage
                        className="w-8 h-8 object-cover rounded-full bg-white"
                        cldImg={myImage}
                        plugins={[responsive(), placeholder()]}
                      />
                      <span className="text-xl truncate text-ellipsis">
                        {bank}
                      </span>
                    </div>
                  }
                  navigate={true}
                  exportXls="true"
                  data={individualBankSize.operating_income}
                  columns={incomeColumns}
                  fileName="Common Size Individual Bank"
                  sheetNames={[
                    "assets",
                    "liabilities",
                    "shareholdersEquity",
                    "operatingIncome",
                    "operatingExpense",
                  ]}
                  exportData={Object.keys(individualBankSize).map((item) => {
                    return individualBankSize[item];
                  })}
                />
              )}
            </div>
            <div className="h-auto w-full">
              {individualBankSize && (
                <VisualiseTable
                  title={
                    <div className="flex flex-row gap-2">
                      <div className="text-xl font-semibold">
                        Operating Expense :{" "}
                      </div>
                      <AdvancedImage
                        className="w-8 h-8 object-cover rounded-full bg-white"
                        cldImg={myImage}
                        plugins={[responsive(), placeholder()]}
                      />
                      <span className="text-xl truncate text-ellipsis">
                        {bank}
                      </span>
                    </div>
                  }
                  columns={expenseColumns}
                  data={individualBankSize.operating_expenses}
                />
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SingleBankPage;

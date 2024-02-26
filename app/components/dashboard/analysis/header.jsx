import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { IoIosArrowDown } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import useMediaQuery from "@/app/hooks/useMediaQuery";
import OptionButtons from "@/app/components/visualise/optionButtons";

const Header = ({ banks, downloadPDF, downloadImage, downloadSheet }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const headerBreakPoint = useMediaQuery("(max-width: 1170px)");
  const selectedBanks =
    JSON.parse(searchParams.get("banks")) ||
    banks.slice(0, 3).map((bank) => bank.name);
  const bank1 = selectedBanks[0];
  const bank2 = selectedBanks[1];
  const bank3 = selectedBanks[2];
  const category = searchParams.get("category");

  function navigate({ paramNameToUpdate, newValue }) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(paramNameToUpdate, newValue);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  }
  return (
    <div
      className={`flex ${
        headerBreakPoint && "flex-col items-start justify-start gap-2"
      } flex-row justify-between w-full`}
    >
      <div className="flex flex-col sm:flex-row w-full gap-5">
        <DropdownMenu>
          <div className="w-full lg:w-auto p-3 rounded-lg bg-secondary">
            <div className="w-auto pb-2 text-sm font-bold">Target Bank:</div>
            <DropdownMenuTrigger asChild>
              <Button
                variant="dropdown"
                className="flex justify-between w-full lg:w-[180px] text-xs rounded-lg"
              >
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row justify-center items-center min-h-7 min-w-7 rounded-full bg-secondary dark:bg-white">
                    <img
                      src={`${
                        banks.find((item) => bank1 === item.name).iconUrl
                      }`}
                      className="h-4 w-4"
                    ></img>
                  </div>
                  <div className="mt-1.5">
                    {!bank1 || bank1 === "null" ? "Select Bank:" : bank1}
                  </div>
                </div>
                <IoIosArrowDown size={22} className="flex dark:text-primary" />{" "}
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>Target Bank</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={bank1}
              onValueChange={(v) => {
                navigate({
                  paramNameToUpdate: "banks",
                  newValue: `["${v}","${bank2}","${bank3}"]`,
                });
              }}
            >
              {banks
                .filter((item) => item.name !== bank2 && item.name !== bank3)
                .map((item, index) => {
                  return (
                    <DropdownMenuRadioItem
                      key={index}
                      value={`${item.name}`}
                      className="flex flex-row justify-start w-full pl-10"
                    >
                      {item.name}
                    </DropdownMenuRadioItem>
                  );
                })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <div className="flex flex-col items-start w-full lg:w-auto p-3 bg-secondary rounded-lg">
            <div className="w-auto text-sm font-bold pb-2">Competitor 1:</div>
            <DropdownMenuTrigger asChild>
              <Button
                variant="dropdown"
                className="flex justify-between w-full lg:w-[180px] text-xs rounded-lg"
              >
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row justify-center items-center min-h-7 min-w-7 rounded-full bg-secondary dark:bg-white">
                    <img
                      src={`${
                        banks.find((item) => bank2 === item.name).iconUrl
                      }`}
                      className="h-4 w-4"
                    ></img>
                  </div>
                  <div className="mt-1.5">
                    {!bank2 || bank2 === "null" ? "Select Bank:" : bank2}
                  </div>
                </div>
                <IoIosArrowDown size={22} className="flex dark:text-primary" />{" "}
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={bank2}
              onValueChange={(v) => {
                navigate({
                  paramNameToUpdate: "banks",
                  newValue: `["${bank1}","${v}","${bank3}"]`,
                });
              }}
            >
              {banks
                .filter((item) => item.name !== bank1 && item.name !== bank3)
                .map((item, index) => {
                  return (
                    <DropdownMenuRadioItem
                      key={index}
                      value={`${item.name}`}
                      className="flex flex-row justify-start w-full pl-10"
                    >
                      {item.name}
                    </DropdownMenuRadioItem>
                  );
                })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <div className="w-full lg:w-auto p-3 bg-secondary rounded-lg">
            <div className="w-full lg:w-auto text-sm font-bold pb-2">
              Competitor 2:
            </div>
            <DropdownMenuTrigger asChild>
              <Button
                variant="dropdown"
                className="flex justify-between w-full lg:w-[180px] text-xs rounded-lg"
              >
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row justify-center items-center min-h-7 min-w-7 rounded-full bg-secondary dark:bg-white">
                    <img
                      src={`${
                        banks.find((item) => bank3 === item.name).iconUrl
                      }`}
                      className="h-4 w-4"
                    ></img>
                  </div>
                  <div className="mt-1.5">
                    {!bank3 || bank3 === "null" ? "Select Bank:" : bank3}
                  </div>
                </div>
                <IoIosArrowDown size={22} className="flex dark:text-primary" />{" "}
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={bank3}
              onValueChange={(v) => {
                navigate({
                  paramNameToUpdate: "banks",
                  newValue: `["${bank1}","${bank2}","${v}"]`,
                });
              }}
            >
              {banks
                .filter((item) => item.name !== bank1 && item.name !== bank2)
                .map((item, index) => {
                  return (
                    <DropdownMenuRadioItem
                      key={index}
                      value={`${item.name}`}
                      className="flex flex-row justify-start w-full pl-10"
                    >
                      {item.name}
                    </DropdownMenuRadioItem>
                  );
                })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden lg:flex flex-row justify-end gap-1">
        {["Total Deposits", "Total Gross Loans"].includes(category) ? (
          <OptionButtons
            type="table"
            view={true}
            downloadSheet={downloadSheet}
          />
        ) : (
          <OptionButtons
            type="chart"
            view={true}
            downloadPDF={downloadPDF}
            downloadImage={downloadImage}
          />
        )}
      </div>
    </div>
  );
};

export default Header;

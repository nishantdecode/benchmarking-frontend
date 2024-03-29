import React from "react";
import { useSearchParams } from "next/navigation";

import { CgSelectR } from "react-icons/cg";

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

import OptionButtons from "@/app/components/visualise/optionButtons";

const SelectCategory = ({
  categories,
  setCategory,
  downloadPDF,
  downloadImage,
  downloadSheet,
}) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  return (
    <>
      <div className="hidden lg:flex flex-col justify-start w-full gap-2">
        {categories.map((item, index) => {
          return (
            <Button
              key={index}
              variant={`${
                category?.toString() === item.value.toString() ? "selectActive" : "select"
              }`}
              onClick={() => {
                setCategory(item.value)
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
      <div className="flex flex-col sm:flex-row justify-between lg:hidden w-full gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex justify-center gap-2 px-5 sm:px-10 rounded-lg w-full sm:w-[300px]"
            >
              <CgSelectR size={20} /> {categories.find(item => item.value === category)?.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={category}
              onValueChange={(v) => {
                setCategory(v)
              }}
            >
              {categories.map((item, index) => {
                return (
                  <DropdownMenuRadioItem
                    key={index}
                    value={`${item.value}`}
                    className="flex flex-row justify-start w-full pl-10"
                  >
                    {item.name}
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {["totalDeposits", "totalGrossLoans"].includes(category) ? (
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
    </>
  );
};

export default SelectCategory;

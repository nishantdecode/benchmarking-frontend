import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function SelectBanks({ banks }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  let checkedBanks =
    JSON.parse(searchParams.get("checkedBanks")) ||
    banks.map((bank) => bank.name);

  function navigate({ paramNameToUpdate, newValue }) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(paramNameToUpdate, newValue);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  }
  return (
    <>
      <div className="hidden lg:flex flex-col items-start gap-2">
        <div className="flex flex-row w-full py-2 px-3 gap-2">
          <Checkbox
            id="Select All"
            checked={checkedBanks.length === banks.length}
            onCheckedChange={() => {
              const updatedBanks =
                checkedBanks.length === banks.length
                  ? []
                  : banks.map((bank) => bank.name);
              navigate({
                paramNameToUpdate: "checkedBanks",
                newValue: JSON.stringify(updatedBanks),
              });
            }}
          />
          <label
            htmlFor="Select All"
            className="text-sm font-medium text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select All
          </label>
        </div>
        {banks.map((bank) => (
          <div
            key={bank.name}
            className={`${
              checkedBanks.includes(bank.name)
                ? "bg-toggle text-toggle-foreground"
                : " "
            } flex flex-row justify-start items-center h-12 w-full py-3 px-3 gap-2 rounded-md`}
          >
            <Checkbox
              id={bank.name}
              checked={checkedBanks.includes(bank.name)}
              onCheckedChange={() => {
                const updatedBanks = checkedBanks.includes(bank.name)
                  ? checkedBanks.filter((item) => item !== bank.name)
                  : [...checkedBanks, bank.name];
                navigate({
                  paramNameToUpdate: "checkedBanks",
                  newValue: JSON.stringify(updatedBanks),
                });
              }}
            />
            <div
              className="min-h-4 min-w-4"
              style={{ backgroundColor: bank.color }}
            ></div>
            <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
              <img src={bank.iconUrl} className="h-4 w-4"></img>
            </div>
            <span className="text-xs truncate text-ellipsis">{bank.name}</span>
          </div>
        ))}
      </div>
      <div className="lg:hidden flex flex-col sm:flex-row justify-between w-full gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex justify-center gap-2 px-5 sm:px-10 rounded-lg w-full sm:w-[300px]"
            >
              <span className="text-xs">Select Banks...</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuCheckboxItem
              id="Select All"
              className="flex flex-row justify-start w-full pl-10 gap-2"
              checked={checkedBanks.length === banks.length}
              onCheckedChange={() => {
                const updatedBanks =
                  checkedBanks.length === banks.length
                    ? []
                    : banks.map((bank) => bank.name);
                navigate({
                  paramNameToUpdate: "checkedBanks",
                  newValue: JSON.stringify(updatedBanks),
                });
              }}
            >
              <label
                htmlFor="Select All"
                className="text-sm font-medium text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select All
              </label>
            </DropdownMenuCheckboxItem>
            {banks.map((item, index) => {
              return (
                <DropdownMenuCheckboxItem
                  id={item.name}
                  key={index}
                  className="flex flex-row justify-start w-full pl-10 gap-3"
                  checked={checkedBanks.includes(item.name)}
                  onCheckedChange={() => {
                    const updatedBanks = checkedBanks.includes(item.name)
                      ? checkedBanks.filter((bank) => bank !== item.name)
                      : [...checkedBanks, item.name];
                    navigate({
                      paramNameToUpdate: "checkedBanks",
                      newValue: JSON.stringify(updatedBanks),
                    });
                  }}
                >
                  <div
                    className="min-h-4 min-w-4"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
                    <img src={item.iconUrl} className="h-4 w-4"></img>
                  </div>
                  <span className="text-xs">{item.name}</span>
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

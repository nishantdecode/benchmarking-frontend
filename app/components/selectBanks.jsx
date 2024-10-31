import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

export function SelectBanks({ banks, checkedBanks, setCheckedBanks, checkedBankNames = "checkedBanks" }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dohnlambm",
    },
  });

  if (!banks || banks.length === 0) {
    return (
      <Skeleton className="hidden lg:flex h-full lg:h-[600px] w-full bg-secondary"></Skeleton>
    );
  }
  return (
    <>
      <div className="hidden lg:flex flex-col items-start gap-3">
        <div className="flex flex-row h-10 w-full py-2 px-3 gap-2">
          <Checkbox
            id="Select All"
            checked={checkedBanks.length === banks.length}
            onCheckedChange={() => {
              const updatedBanks =
                checkedBanks.length === banks.length
                  ? []
                  : banks.map((bank) => bank.name);
              setCheckedBanks(updatedBanks)
            }}
          />
          <label
            htmlFor="Select All"
            className="text-sm font-medium text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select All
          </label>
        </div>
        {banks.map((bank) => {
          const myImage = cld.image(bank.iconUrl);
          return (
            <div
              key={bank.name}
              className={`${
                checkedBanks.includes(bank.name)
                  ? "bg-secondary text-foreground dark:bg-toggle dark:text-toggle-foreground"
                  : " "
              } flex flex-row justify-start items-center h-10 w-full py-3 px-3 gap-2 rounded-md`}
            >
              <Checkbox
                id={bank.name}
                checked={checkedBanks.includes(bank.name)}
                onCheckedChange={() => {
                  const updatedBanks = checkedBanks.includes(bank.name)
                    ? checkedBanks.filter((item) => item !== bank.name)
                    : [...checkedBanks, bank.name];
                  setCheckedBanks(updatedBanks)
                }}
              />
              <div
                className="min-h-4 min-w-4"
                style={{ backgroundColor: bank.color }}
              ></div>
              <AdvancedImage
                className="w-6 h-6 object-cover rounded-full bg-white"
                cldImg={myImage}
                plugins={[responsive(), placeholder()]}
              />
              <span className="text-xs truncate text-ellipsis">
                {bank.name}
              </span>
            </div>
          );
        })}
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
                setCheckedBanks(updatedBanks)
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
              const myImage = cld.image(item.iconUrl);
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
                    setCheckedBanks(updatedBanks)
                  }}
                >
                  <div
                    className="min-h-4 min-w-4"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <AdvancedImage
                    className="w-6 h-6 object-cover rounded-full bg-white"
                    cldImg={myImage}
                    plugins={[responsive(), placeholder()]}
                  />
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

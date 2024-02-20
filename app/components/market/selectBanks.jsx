import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

export function SelectBanks({ banks, checkedBanks, setCheckedBanks }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-row gap-3 w-full py-2 px-4">
        <Checkbox
          id="Select All"
          checked={checkedBanks.length === banks.length}
          onCheckedChange={() => {
            setCheckedBanks(
              checkedBanks.length === banks.length
                ? []
                : banks.map((bank) => bank.name)
            );
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
        <div key={bank.name} className={`${checkedBanks.includes(bank.name) ? "bg-toggle" : " "} flex flex-row gap-3 rounded-md w-full py-3 px-4`}>
          <Checkbox
            id={bank.name}
            checked={checkedBanks.includes(bank.name)}
            onCheckedChange={() => {
              setCheckedBanks((prevBanks) =>
                checkedBanks.includes(bank.name)
                  ? prevBanks.filter((item) => item !== bank.name)
                  : [...prevBanks, bank.name]
              );
            }}
          />
          <label
            htmlFor={bank.name}
            className="flex flex-row gap-2 text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <div className="mb-0.5">{bank.iconUrl}</div>
            <div className="mt-0.5">{bank.name}</div>
          </label>
        </div>
      ))}
    </div>
  );
}

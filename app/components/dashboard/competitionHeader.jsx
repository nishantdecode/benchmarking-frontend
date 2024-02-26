import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

import { BiCalendar } from "react-icons/bi";

const CompetitionHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bank = searchParams.get("bank");
  const currentYear = new Date().getFullYear();

  function navigate({ paramNameToUpdate, newValue }) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(paramNameToUpdate, newValue);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  }
  return (
    <div className="flex flex-row justify-between h-auto w-full">
      <div className="flex flex-col sm:flex-row justify-start gap-2 sm:gap-5">
        <div className="text-xl font-medium text-foreground">Competition</div>
        <div className="flex flex-row gap-2 sm:gap-5">
          <div className="flex flex-row justify-start mt-1.5 gap-2">
            <div className="h-3 sm:h-4 w-3 sm:w-4 mt-0.5 sm:mt-0 bg-green-600"></div>
            <div className="text-[10px] sm:text-xs text-foreground">
              Highest
            </div>
          </div>
          <div className="flex flex-row justify-start mt-1.5 gap-2">
            <div className="h-3 sm:h-4 w-3 sm:w-4 mt-0.5 sm:mt-0 bg-red-500"></div>
            <div className="text-[10px] sm:text-xs text-foreground">Lowest</div>
          </div>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="dropdown"
              className="px-5 sm:px-8 gap-2 dark:border-2 rounded-lg"
            >
              <BiCalendar size={20} /> {searchParams.get("year") || currentYear}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel className="flex flex-row justify-center w-full">
              Select Year
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={searchParams.get("year") || currentYear}
              onValueChange={(year) => {
                navigate({
                  paramNameToUpdate: "year",
                  newValue: year,
                });
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => {
                const currentYear = new Date().getFullYear();
                const year = currentYear - index;
                return (
                  <DropdownMenuRadioItem
                    key={index}
                    value={`${year}`}
                    className="flex flex-row justify-center w-full"
                  >
                    {year}
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CompetitionHeader;

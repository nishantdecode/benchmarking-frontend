import * as React from "react";

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
import { Skeleton } from "@/components/ui/skeleton";

const CompetitionHeader = ({ years, year, setYear }) => {
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
        {(years && years.length !== 0) ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="dropdown"
                className="px-5 sm:px-8 gap-2 dark:border-2 rounded-lg"
              >
                <BiCalendar size={20} /> {year}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel className="flex flex-row justify-center w-full">
                Select Year
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={year}
                onValueChange={(item) => {
                  setYear(item);
                }}
              >
                {years.map((item, index) => {
                  return (
                    <DropdownMenuRadioItem
                      key={index}
                      value={`${item}`}
                      className="flex flex-row justify-center w-full"
                    >
                      {item}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Skeleton className="h-[38px] w-[130px]"/>
        )}
      </div>
    </div>
  );
};

export default CompetitionHeader;

"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiCalendar } from "react-icons/bi";

const CompetitionHeader = ({ year, setYear }) => {
  return (
    <div className="flex flex-row justify-between w-full h-auto">
      <div className="flex flex-col sm:flex-row justify-start gap-2 sm:gap-5">
        <div className="text-foreground text-xl font-medium">Competition</div>
        <div className="flex flex-row gap-2 sm:gap-5">
          <div className="flex flex-row justify-start gap-2 mt-1.5">
            <div className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 sm:mt-0 bg-green-600"></div>
            <div className="text-foreground text-[10px] sm:text-xs">
              Highest
            </div>
          </div>
          <div className="flex flex-row justify-start gap-2 mt-1.5">
            <div className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 sm:mt-0 bg-red-500"></div>
            <div className="text-foreground text-[10px] sm:text-xs">Lowest</div>
          </div>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 px-5 sm:px-10 rounded-xl"
            >
              <BiCalendar size={20} /> {year}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30">
            <DropdownMenuLabel>Select Year</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={year} onValueChange={setYear}>
              {Array.from({ length: 5 }).map((_, index) => {
                const currentYear = new Date().getFullYear();
                const year = currentYear - index;
                return (
                  <DropdownMenuRadioItem key={index} value={`${year}`}>
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

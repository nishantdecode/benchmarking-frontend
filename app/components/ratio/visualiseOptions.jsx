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
import { IoIosArrowDown } from "react-icons/io";

const VisualiseOptions = ({
  category,
  interval,
  setInterval,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
}) => {
  return (
    <div className="flex flex-row gap-5">
      <div className="mt-2 w-[180px]">{category} :</div>
      <Button variant="outline" className="flex py-0 text-xs justify-center w-full sm:w-auto gap-2">{interval} <IoIosArrowDown size={16} className='text-primary'/></Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 px-5 sm:px-10 rounded-xl">
            <BiCalendar size={20} /> {startYear}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30">
          <DropdownMenuLabel>Start Year</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={startYear} onValueChange={setStartYear}>
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
      <div className="mt-2.5 text-xs">to</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 px-5 sm:px-10 rounded-xl">
            <BiCalendar size={20} /> {endYear}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30">
          <DropdownMenuLabel>End Year</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={endYear} onValueChange={setEndYear}>
            {Array.from({ length: 5 }).map((_, index) => {
              const year = startYear - index;
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
  );
};

export default VisualiseOptions;

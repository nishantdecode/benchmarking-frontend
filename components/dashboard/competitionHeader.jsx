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

const CompetitionHeader = () => {
  const [position, setPosition] = React.useState("2022");
  return (
    <div className="flex flex-row justify-between w-full h-auto">
      <div className="flex flex-row justify-start gap-5">
        <div className="text-foreground text-xl font-medium">
          Competition
        </div>
        <div className="flex flex-row justify-start gap-2 mt-1.5">
          <div className="w-4 h-4 bg-green-600"></div>
          <div className="text-foreground text-xs">Highest</div>
        </div>
        <div className="flex flex-row justify-start gap-2 mt-1.5">
          <div className="w-4 h-4 bg-red-500"></div>
          <div className="text-foreground text-xs">Lowest</div>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 px-10 rounded-xl"><BiCalendar size={20}/> 2022</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30">
            <DropdownMenuLabel>Select Year</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="2021">2021</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="2020">
                2020
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="2019">2019</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CompetitionHeader;

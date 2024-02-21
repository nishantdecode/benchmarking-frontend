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
import React, { useEffect, useState } from "react";
import OptionButtons from "./optionButtons";
import { IoIosArrowDown } from "react-icons/io";
import { PiBankBold } from "react-icons/pi";

const HeaderAnalysis = ({
  banks,
  bank,
  setBank,
  competitionOne,
  setCompetitionOne,
  competitionTwo,
  setCompetitionTwo,
}) => {
  const [bank1, setBank1] = useState(bank);
  const [bank2, setBank2] = useState(competitionOne);
  const [bank3, setBank3] = useState(competitionTwo);

  useEffect(() => {
    setBank1(bank);
    setBank2(competitionOne);
    setBank3(competitionTwo);
  }, [bank, competitionOne, competitionTwo]);

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <DropdownMenu>
          <div className="w-full lg:w-auto p-3 bg-secondary rounded-lg">
            <div className="w-auto text-sm font-bold pb-2">Target Bank:</div>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex justify-between text-xs rounded-lg w-full lg:w-[180px]"
              >
                <div className="flex flex-row gap-2">
                  <PiBankBold size={16} className="flex" />
                  <div>
                    {!bank || bank === "null" ? "Select Bank:" : bank}
                  </div>
                </div>
                <IoIosArrowDown size={20} />{" "}
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-30">
            <DropdownMenuLabel>Target Bank</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={bank} onValueChange={setBank}>
              {banks
                .filter((item) => item.name !== bank2 && item.name !== bank3)
                .map((item, index) => {
                  return (
                    <DropdownMenuRadioItem key={index} value={`${item.name}`}>
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
                variant="outline"
                className="flex justify-between text-xs rounded-lg w-full lg:w-[180px]"
              >
                <div className="flex flex-row gap-2">
                  <PiBankBold size={16} className="flex" />
                  <div>
                  {!competitionOne || competitionOne === "null"
                  ? "Select Bank:"
                  : competitionOne}
                  </div>
                </div>
                <IoIosArrowDown size={20} />{" "}
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-30">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={competitionOne}
              onValueChange={setCompetitionOne}
            >
              {banks
                .filter((item) => item.name !== bank1 && item.name !== bank3)
                .map((item, index) => {
                  return (
                    <DropdownMenuRadioItem key={index} value={`${item.name}`}>
                      {item.name}
                    </DropdownMenuRadioItem>
                  );
                })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <div className="w-full lg:w-auto p-3 bg-secondary rounded-lg">
            <div className="w-full lg:w-auto text-sm font-bold pb-2">Competitor 2:</div>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex justify-between text-xs rounded-lg w-full lg:w-[180px]"
              >
                <div className="flex flex-row gap-2">
                  <PiBankBold size={16} className="flex" />
                  <div>
                  {!competitionTwo || competitionTwo === "null"
                  ? "Select Bank:"
                  : competitionTwo}
                  </div>
                </div>
                <IoIosArrowDown size={20} />{" "}
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-30">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={competitionTwo}
              onValueChange={setCompetitionTwo}
            >
              {banks
                .filter((item) => item.name !== bank1 && item.name !== bank2)
                .map((item, index) => {
                  return (
                    <DropdownMenuRadioItem key={index} value={`${item.name}`}>
                      {item.name}
                    </DropdownMenuRadioItem>
                  );
                })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden lg:flex flex-row justify-end gap-1">
        <OptionButtons />
      </div>
    </div>
  );
};

export default HeaderAnalysis;

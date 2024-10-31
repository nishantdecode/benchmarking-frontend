import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import { IoIosArrowDown } from "react-icons/io";

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

import useMediaQuery from "@/app/hooks/useMediaQuery";
import OptionButtons from "@/app/components/visualise/optionButtons";

const Header = ({
  banks,
  category,
  checkedBanks,
  setCheckedBanks,
  downloadPDF,
  downloadImage,
  downloadSheet,
}) => {
  const headerBreakPoint = useMediaQuery("(max-width: 1170px)");
  if (!banks || banks.length === 0) {
    return null;
  }
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dohnlambm",
    },
  });
  const bank1 = checkedBanks[0];
  const bank2 = checkedBanks[1];
  const bank3 = checkedBanks[2];
  const myImage1 = cld.image(
    banks.find((item) => item.name === bank1)?.iconUrl
  );
  const myImage2 = cld.image(
    banks.find((item) => item.name === bank2)?.iconUrl
  );
  const myImage3 = cld.image(
    banks.find((item) => item.name === bank3)?.iconUrl
  );
  return (
    <div
      className={`flex ${
        headerBreakPoint && "flex-col items-start justify-start gap-2"
      } flex-row justify-between w-full`}
    >
      <div className="flex flex-col sm:flex-row w-full gap-5">
        <DropdownMenu>
          <div className="w-full lg:w-auto p-3 rounded-lg bg-secondary">
            <div className="w-auto pb-2 text-sm font-bold">Target Bank:</div>
            <DropdownMenuTrigger asChild>
              <Button
                variant="dropdown"
                className="flex justify-between w-full lg:w-[180px] text-xs rounded-lg"
              >
                <div className="flex flex-row gap-2 truncate">
                  <div className="flex flex-row justify-center items-center min-h-7 min-w-7 rounded-full bg-secondary dark:bg-white">
                    <AdvancedImage
                      className="w-4 h-4 object-cover rounded-full bg-white"
                      cldImg={myImage1}
                      plugins={[responsive(), placeholder()]}
                    />
                  </div>
                  <div
                    className={`${
                      checkedBanks[0] ? "mt-1.5" : "mt-0"
                    } text-xs truncate text-ellipsis`}
                  >
                    {!bank1 || bank1 === "null" ? "Select Bank:" : bank1}
                  </div>
                </div>
                <IoIosArrowDown size={22} className="flex dark:text-primary" />{" "}
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>Target Bank</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={bank1}
              onValueChange={(v) => {
                setCheckedBanks([v, bank2, bank3]);
              }}
            >
              {banks
                .filter((item) => item.name !== bank2 && item.name !== bank3)
                .map((item, index) => {
                  return (
                    <DropdownMenuRadioItem
                      key={index}
                      value={`${item.name}`}
                      className="flex flex-row justify-start w-full pl-10"
                    >
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
                variant="dropdown"
                className="flex justify-between w-full lg:w-[180px] text-xs rounded-lg"
              >
                <div className="flex flex-row gap-2 truncate">
                  <div className="flex flex-row justify-center items-center min-h-7 min-w-7 rounded-full bg-secondary dark:bg-white">
                    <AdvancedImage
                      className="w-4 h-4 object-cover rounded-full bg-white"
                      cldImg={myImage2}
                      plugins={[responsive(), placeholder()]}
                    />
                  </div>
                  <div className="mt-1.5 text-xs truncate text-ellipsis">
                    {!bank2 || bank2 === "null" ? "Select Bank:" : bank2}
                  </div>
                </div>
                <IoIosArrowDown size={22} className="flex dark:text-primary" />{" "}
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={bank2}
              onValueChange={(v) => {
                setCheckedBanks([bank1, v, bank3]);
              }}
            >
              {banks
                .filter((item) => item.name !== bank1 && item.name !== bank3)
                .map((item, index) => {
                  return (
                    <DropdownMenuRadioItem
                      key={index}
                      value={`${item.name}`}
                      className="flex flex-row justify-start w-full pl-10"
                    >
                      {item.name}
                    </DropdownMenuRadioItem>
                  );
                })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <div className="w-full lg:w-auto p-3 bg-secondary rounded-lg">
            <div className="w-full lg:w-auto text-sm font-bold pb-2">
              Competitor 2:
            </div>
            <DropdownMenuTrigger asChild>
              <Button
                variant="dropdown"
                className="flex justify-between w-full lg:w-[180px] text-xs rounded-lg"
              >
                <div className="flex flex-row gap-2 truncate">
                  <div className="flex flex-row justify-center items-center min-h-7 min-w-7 rounded-full bg-secondary dark:bg-white">
                    <AdvancedImage
                      className="w-4 h-4 object-cover rounded-full bg-white"
                      cldImg={myImage3}
                      plugins={[responsive(), placeholder()]}
                    />
                  </div>
                  <div className="mt-1.5 text-xs truncate text-ellipsis">
                    {!bank3 || bank3 === "null" ? "Select Bank:" : bank3}
                  </div>
                </div>
                <IoIosArrowDown size={22} className="flex dark:text-primary" />{" "}
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={bank3}
              onValueChange={(v) => {
                setCheckedBanks([bank1, bank2, v]);
              }}
            >
              {banks
                .filter((item) => item.name !== bank1 && item.name !== bank2)
                .map((item, index) => {
                  return (
                    <DropdownMenuRadioItem
                      key={index}
                      value={`${item.name}`}
                      className="flex flex-row justify-start w-full pl-10"
                    >
                      {item.name}
                    </DropdownMenuRadioItem>
                  );
                })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden lg:flex flex-row justify-end gap-1">
        {["totalDeposits", "totalGrossLoans"].includes(category) ? (
          <OptionButtons type="table" downloadSheet={downloadSheet} />
        ) : (
          <OptionButtons
            type="chart"
            downloadPDF={downloadPDF}
            downloadImage={downloadImage}
          />
        )}
      </div>
    </div>
  );
};

export default Header;

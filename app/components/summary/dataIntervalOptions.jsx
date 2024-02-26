import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiCalendar } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const DataIntervalItemOptions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();
  const category = searchParams.get("categoryItems") || "";
  const intervalTypeParam = searchParams.get("intervalType");
  const intervalType = intervalTypeParam
    ? decodeURIComponent(intervalTypeParam)
    : "YoY & YTD";
  const start = JSON.parse(searchParams.get("start")) || {
    first:
      intervalType === "Half-Yearly"
        ? "H1"
        : intervalType === "Quarterly"
        ? "Q1"
        : "",
    second: currentYear,
  };
  const end = JSON.parse(searchParams.get("end")) || {
    first:
      intervalType === "Half-Yearly"
        ? "H1"
        : intervalType === "Quarterly"
        ? "Q1"
        : "",
    second: currentYear - 1,
  };

  function navigate({ paramNameToUpdate, newValue }) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(paramNameToUpdate, newValue);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  }
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full gap-3">
      <div className="hidden lg:flex justify-end mt-2 w-[180px] truncate text-ellipsis">{category} :</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="flex justify-between gap-2 rounded-md w-full sm:w-[300px] md:w-auto text-xs"
          >
            <div className="flex flex-row gap-2">
              {intervalType || "YoY & YTD"}
            </div>
            <IoIosArrowDown size={16} className="flex dark:text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuRadioGroup
            value={intervalType}
            onValueChange={(v) => {
              navigate({
                paramNameToUpdate: "intervalType",
                newValue: encodeURIComponent(v),
              });
            }}
            className="flex flex-col gap-2"
          >
            <DropdownMenuRadioItem
              value="YoY & YTD"
              className="flex flex-row justify-center w-full"
            >
              <div>YoY & YTD</div>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="Half-Yearly"
              className="flex flex-row justify-center w-full"
            >
              <div>Half-Yearly</div>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="Quarterly"
              className="flex flex-row justify-center w-full"
            >
              <div>Quarterly</div>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex gap-1">
        <div className="flex flex-row gap-1">
          {intervalType === "Half-Yearly" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="dropdown"
                  className="gap-2 dark:border-2 rounded-lg"
                >
                  {start.first || "H1"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup
                  value={start.first}
                  onValueChange={(v) => {
                    navigate({
                      paramNameToUpdate: "start",
                      newValue: JSON.stringify({
                        first: v,
                        second: start.second,
                      }),
                    });
                  }}
                  className="flex flex-col gap-2"
                >
                  <DropdownMenuRadioItem
                    value="H1"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>H1</div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="H2"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>H2</div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : intervalType === "Quarterly" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="dropdown"
                  className="gap-2 dark:border-2 rounded-lg"
                >
                  {start.first || "Q1"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup
                  value={start.first}
                  onValueChange={(v) => {
                    navigate({
                      paramNameToUpdate: "start",
                      newValue: JSON.stringify({
                        first: v,
                        second: start.second,
                      }),
                    });
                  }}
                  className="flex flex-col gap-2"
                >
                  <DropdownMenuRadioItem
                    value="Q1"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>Q1</div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="Q2"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>Q2</div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="Q3"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>Q3</div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="Q4"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>Q4</div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <></>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="dropdown"
                className="px-3 gap-2 dark:border-2 rounded-lg"
              >
                <BiCalendar size={20} /> {start.second}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuRadioGroup
                value={start.second}
                onValueChange={(year) => {
                  navigate({
                    paramNameToUpdate: "start",
                    newValue: JSON.stringify({
                      first: start.first,
                      second: year,
                    }),
                  });
                }}
              >
                {Array.from({ length: 5 }).map((_, index) => {
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

        <div className="mt-2.5 text-xs">to</div>

        <div className="flex flex-row gap-1">
          {intervalType === "Half-Yearly" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="dropdown"
                  className="gap-2 dark:border-2 rounded-lg"
                >
                  {end.first || "H1"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup
                  value={end.first}
                  onValueChange={(v) => {
                    navigate({
                      paramNameToUpdate: "end",
                      newValue: JSON.stringify({
                        first: v,
                        second: end.second,
                      }),
                    });
                  }}
                  className="flex flex-col gap-2"
                >
                  <DropdownMenuRadioItem
                    value="H1"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>H1</div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="H2"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>H2</div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : intervalType === "Quarterly" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="dropdown"
                  className="gap-2 dark:border-2 rounded-lg"
                >
                  {end.first || "Q1"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup
                  value={end.first}
                  onValueChange={(v) => {
                    navigate({
                      paramNameToUpdate: "end",
                      newValue: JSON.stringify({
                        first: v,
                        second: end.second,
                      }),
                    });
                  }}
                  className="flex flex-col gap-2"
                >
                  <DropdownMenuRadioItem
                    value="Q1"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>Q1</div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="Q2"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>Q2</div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="Q3"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>Q3</div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="Q4"
                    className="flex flex-row justify-center w-full"
                  >
                    <div>Q4</div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <></>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="dropdown"
                className="px-3 gap-2 dark:border-2 rounded-lg"
              >
                <BiCalendar size={20} /> {end.second}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuRadioGroup
                value={end.second}
                onValueChange={(year) => {
                  navigate({
                    paramNameToUpdate: "end",
                    newValue: JSON.stringify({
                      first: end.first,
                      second: year,
                    }),
                  });
                }}
              >
                {Array.from({ length: 5 }).map((_, index) => {
                  const year = currentYear - 1 - index;
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
    </div>
  );
};

export default DataIntervalItemOptions;

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { BiCalendar } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const DataIntervalOptions = ({ years, category, date, setDate }) => {
  if (!years || years.length === 0) {
    return (
      <Skeleton className="hidden lg:flex h-[50px] w-full bg-secondary"></Skeleton>
    );
  }

  return (
    <div className="flex flex-row justify-center items-center w-full gap-3">
      <div className="hidden lg:flex justify-center">
        <span className="w-[200px] mt-2 truncate text-ellipsis">
          {category} :
        </span>
      </div>
      <div className="flex flex-col md:flex-row grow justify-center lg:justify-start items-center lg:pl-6 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="flex justify-between gap-2 rounded-md w-full sm:w-[300px] md:w-auto text-xs"
            >
              <div className="flex flex-row gap-2">
                {date.interval === "YEARLY" ? "YoY & YTD" : "Quarterly"}
              </div>
              <IoIosArrowDown size={16} className="flex dark:text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuRadioGroup
              value={date.interval}
              onValueChange={(v) => {
                setDate((prev) => {
                  return {
                    interval: v,
                    startDate: new Date(
                      Date.UTC(prev.startDate.getFullYear(), 0, 1, 0, 0, 0, 0)
                    ),
                    endDate: new Date(
                      Date.UTC(prev.endDate.getFullYear(), 0, 1, 0, 0, 0, 0)
                    ),
                  };
                });
              }}
              className="flex flex-col gap-2"
            >
              <DropdownMenuRadioItem
                value="YEARLY"
                className="flex flex-row justify-center w-full"
              >
                <div>YoY & YTD</div>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="QUARTERLY"
                className="flex flex-row justify-center w-full"
              >
                <div>Quarterly</div>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-2">
          <div className="flex flex-row gap-1">
            {date.interval === "QUARTERLY" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="dropdown"
                    className="gap-2 dark:border-2 rounded-lg"
                  >
                    {`Q${Math.ceil((date.startDate.getMonth() + 1) / 3)}` ||
                      "Q1"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuRadioGroup
                    value={`${date.startDate.getMonth() + 1}`}
                    onValueChange={(v) => {
                      setDate((prev) => {
                        return {
                          interval: prev.interval,
                          startDate: new Date(
                            Date.UTC(
                              prev.startDate.getFullYear(),
                              v, 1, 0, 0, 0, 0
                            )
                          ),
                          endDate: prev.endDate,
                        };
                      });
                    }}
                    className="flex flex-col gap-2"
                  >
                    <DropdownMenuRadioItem
                      value={0}
                      className="flex flex-row justify-center w-full"
                    >
                      <div>Q1</div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value={3}
                      className="flex flex-row justify-center w-full"
                    >
                      <div>Q2</div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value={6}
                      className="flex flex-row justify-center w-full"
                    >
                      <div>Q3</div>
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
                  className={`${
                    date.interval === "YEARLY" ? "px-8" : "px-3"
                  } gap-2 dark:border-2 rounded-lg`}
                >
                  <BiCalendar size={20} /> {date.startDate.getFullYear()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup
                  value={`${date.startDate.getFullYear()}`}
                  onValueChange={(year) => {
                    setDate((prev) => {
                      return {
                        interval: prev.interval,
                        startDate: new Date(
                          Date.UTC(
                            year,
                            date.startDate.getMonth(),
                            1, 0, 0, 0, 0
                          )
                        ),
                        endDate: prev.endDate,
                      };
                    });
                  }}
                >
                  {years
                    .filter(
                      (year) =>
                        Number(year) < Number(date.endDate.getFullYear())
                    )
                    .map((year, index) => {
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
            {date.interval === "QUARTERLY" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="dropdown"
                    className="gap-2 dark:border-2 rounded-lg"
                  >
                    {`Q${Math.ceil((date.endDate.getMonth() + 1) / 3)}` || "Q1"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuRadioGroup
                    value={`${date.endDate.getMonth() + 1}`}
                    onValueChange={(v) => {
                      setDate((prev) => {
                        return {
                          interval: prev.interval,
                          startDate: prev.startDate,
                          endDate: new Date(
                            Date.UTC(
                              prev.endDate.getFullYear(),
                              v, 1, 0, 0, 0, 0
                            )
                          ),
                        };
                      });
                    }}
                    className="flex flex-col gap-2"
                  >
                    <DropdownMenuRadioItem
                      value={0}
                      className="flex flex-row justify-center w-full"
                    >
                      <div>Q1</div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value={3}
                      className="flex flex-row justify-center w-full"
                    >
                      <div>Q2</div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value={6}
                      className="flex flex-row justify-center w-full"
                    >
                      <div>Q3</div>
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
                  className={`${
                    date.interval === "YEARLY" ? "px-8" : "px-3"
                  } gap-2 dark:border-2 rounded-lg`}
                >
                  <BiCalendar size={20} /> {date.endDate.getFullYear()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup
                  value={`${date.endDate.getFullYear()}`}
                  onValueChange={(year) => {
                    setDate((prev) => {
                      return {
                        interval: prev.interval,
                        startDate: prev.startDate,
                        endDate: new Date(
                          Date.UTC(
                            year,
                            date.endDate.getMonth(),
                            1, 0, 0, 0, 0
                          )
                        ),
                      };
                    });
                  }}
                >
                  {years
                    .filter(
                      (year) =>
                        Number(year) > Number(date.startDate.getFullYear())
                    )
                    .map((year, index) => {
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
    </div>
  );
};

export default DataIntervalOptions;

import React from "react";
import { useSelector } from "react-redux";

import { TbCurrencyRiyal } from "react-icons/tb";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const CompetitionCards = ({ data }) => {
  const banks = useSelector((state) => state.bank.banks);
  if (!data || data.length === 0) {
    return (
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-full space-x-4 pb-5">
          {Array.from({ length: 10 }, (_, index) => (
            <Skeleton key={index} className="h-[90px] w-[280px]" />
          ))}
        </div>
      </ScrollArea>
    );
  }
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-full space-x-4 pb-5">
        {data.map((item) => {
          if (!item) {
            return null;
          }
          return (
            <Card key={item.category} className="w-[310px] p-3">
              <div className="p-1 pl-2 overflow-hidden rounded-md text-xs font-bold bg-black text-white">
                {item.category}
              </div>
              <div className="pt-2 text-xs">
                <div className="flex flex-row justify-between font-bold text-foreground">
                  <div className="flex flex-row gap-2 text-green-600">
                    {
                      banks?.find((bank) => bank.id === item.highest.bankId)
                        ?.name
                    }
                  </div>
                  <div className="flex flex-row gap-2">
                    {/* {item?.highest?.valueType === "currency" ? (
                      
                    ) : (
                      ""
                    )} */}
                    {/* {item?.highest?.value?.toFixed(2)} */}
                    {item?.highest?.valueType === "percentage" ? item?.highest?.value?.toFixed(2) : item?.highest?.value?.toString()?.split(".")[0]?.length >=4 ? (item?.highest?.value/1000000 )?.toFixed(2) :item?.highest?.value?.toFixed(2)}

                    {item?.highest?.valueType === "percentage" ? "%" : item?.highest?.value?.toString()?.split(".")[0]?.length >=4 ? " M" : " M"}
                  </div>
                </div>
                <div className="flex flex-row justify-between font-bold text-foreground">
                  <div className="flex flex-row gap-2 text-red-500">
                    {
                      banks?.find((bank) => bank.id === item.lowest.bankId)
                        ?.name
                    }
                  </div>
                  <div className="flex flex-row gap-2">
                    {/* {item?.lowest?.valueType === "currency" ? (
                      <TbCurrencyRiyal size={16} />
                    ) : (
                      ""
                    )} */}
                    {/* {item?.lowest?.value?.toFixed(2)} */}
                    {item?.lowest?.valueType === "percentage" ? item?.lowest?.value?.toFixed(2) : item?.lowest?.value?.toString()?.split(".")[0]?.length >=4 ? (item?.lowest?.value/1000000 )?.toFixed(2) :item?.lowest?.value?.toFixed(2)}

                    {/* {console.log("TEST",item?.lowest?.valueType, item?.lowest?.value?.toString().split(".")[0])} */}
                    {item?.lowest?.valueType === "percentage" ? "%" :  item?.lowest?.value?.toString()?.split(".")[0]?.length >=4 ? " M" : " M"}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CompetitionCards;

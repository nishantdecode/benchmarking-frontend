import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "../../../components/ui/card";

import { TbCurrencyRiyal } from "react-icons/tb";

const CompetitionCards = ({ data }) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-full space-x-4 pb-5">
        {data.map((item) => (
          <Card key={item.category} className="shrink-0 w-[280px] p-3">
            <div className="overflow-hidden rounded-md bg-black p-1 pl-2 text-xs text-white font-bold">
              {item.category}
            </div>
            <div className="pt-2 text-xs text-muted-foreground">
              <div className="flex flex-row justify-between font-bold text-foreground">
                <div className="flex flex-row text-green-600 gap-2">{item.highest.name}</div>
                <div className="flex flex-row gap-2">{item.highest.valueType === 'currency' ? <TbCurrencyRiyal size={16}/> : ''}{item.highest.value}</div>
              </div>
              <div className="flex flex-row justify-between font-bold text-foreground">
                <div className="flex flex-row text-red-500 gap-2">{item.lowest.name}</div>
                <div className="flex flex-row gap-2">{item.lowest.valueType === 'currency' ? <TbCurrencyRiyal size={16}/> : ''}{item.lowest.value}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CompetitionCards;

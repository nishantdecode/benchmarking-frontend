import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "../ui/card";

const CompetitionCards = ({ data }) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-full space-x-4 pb-5">
        {data.map((item) => (
          <Card key={item.name} className="shrink-0 w-[250px] p-3">
            <div className="overflow-hidden rounded-md bg-black p-1 pl-2 text-xs text-white font-bold">
              {item.name}
            </div>
            <div className="pt-2 text-xs text-muted-foreground">
              <div className="flex flex-row justify-between font-bold text-foreground">
                <div className="text-green-600">{item.highest.name}</div>
                <div>{item.highest.value}</div>
              </div>
              <div className="flex flex-row justify-between font-bold text-foreground">
                <div className="text-red-500">{item.lowest.name}</div>
                <div>{item.lowest.value}</div>
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

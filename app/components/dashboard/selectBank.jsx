import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const SelectBank = ({ banks }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigate({ paramNameToUpdate, newValue }) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(paramNameToUpdate, newValue);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  }
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {banks.map((bank, index) => (
          <CarouselItem
            key={index}
            className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <Card
                onClick={() => {
                  navigate({
                    paramNameToUpdate: "bank",
                    newValue: bank.name,
                  });
                }}
                className={`${
                  searchParams.get("bank") === bank.name
                    ? "border-2 bg-toggle text-primary-foreground"
                    : "hover:bg-secondary/50 dark:hover:bg-toggle/80"
                } border-0`}
              >
                <CardContent className="flex items-center justify-start w-full p-2 px-4 gap-4 truncate">
                  <div
                    className="min-h-5 min-w-5"
                    style={{ backgroundColor: bank.color }}
                  ></div>
                  <div className="flex flex-row justify-center items-center min-h-7 min-w-7 rounded-full bg-secondary dark:bg-white">
                    <img src={bank.iconUrl} className="h-4 w-4"></img>
                  </div>
                  <span className="text-xs sm:text-sm">{bank.name}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="justify-center ml-14" />
      <CarouselNext className="justify-center mr-14" />
    </Carousel>
  );
};

export default SelectBank;

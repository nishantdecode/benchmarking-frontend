import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter, useSearchParams } from "next/navigation";

export function DonutPagination() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();
  const year = searchParams.get("year") || currentYear;

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
      className="w-full px-12 lg:px-20"
    >
      <CarouselContent>
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/4 md:basis-1/6 lg:basis-1/8"
          >
            <button
              className={`${
                year === (currentYear - index).toString() ? "text-primary" : ""
              } p-1`}
              onClick={() =>
                navigate({
                  paramNameToUpdate: "year",
                  newValue: currentYear - index,
                })
              }
            >
              <span className="text-xs sm:text-lg font-medium">
                {currentYear - index}
              </span>
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-12 lg:ml-20 pl-2" />
      <CarouselNext className="mr-12 lg:mr-20 pl-2" />
    </Carousel>
  );
}

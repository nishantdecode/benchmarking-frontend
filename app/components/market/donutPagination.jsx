import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function DonutPagination() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem key={index} className="xs:basis-1/6 md:basis-1/8 lg:basis-1/12">
            <div className="p-1">
              <span className="text-xs sm:text-lg font-medium">{index + 2010}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="pl-2"/>
      <CarouselNext className="pl-2"/>
    </Carousel>
  )
}

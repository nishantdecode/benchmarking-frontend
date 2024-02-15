import React from 'react'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 

const SelectBank = ({data}) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {data.map((bank, index) => (
          <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-start p-2 pl-4 gap-4">
                  <span className="text-sm font-semibold">{bank.icon}</span>
                  <span className="text-sm font-semibold">{bank.name}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="justify-center ml-14"/>
      <CarouselNext className="justify-center mr-14"/>
    </Carousel>
  )
}

export default SelectBank
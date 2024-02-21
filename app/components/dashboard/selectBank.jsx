import React from 'react'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel" 

const SelectBank = ({banks, bankName, setBankName}) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {banks.map((bank, index) => (
          <CarouselItem key={index} className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <div className="p-1">
              <Card onClick={()=>{setBankName(bank.name)}} className={`${bankName === bank.name ? "bg-card/10" : ""} hover:bg-card/50`}>
                <CardContent className="flex items-center justify-start p-2 px-4 gap-4">
                  <span className="text-xs sm:text-sm font-semibold">{bank.iconUrl}</span>
                  <span className="text-xs sm:text-sm font-semibold">{bank.name}</span>
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
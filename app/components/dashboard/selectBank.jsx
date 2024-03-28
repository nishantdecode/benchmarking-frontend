import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import { PiBankBold } from "react-icons/pi";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const SelectBank = ({ banks, bank, setBank }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dohnlambm",
    },
  });
  if (!banks || banks.length === 0) {
    return (
      <Skeleton className="flex h-full lg:h-[50px] w-full bg-secondary"></Skeleton>
    );
  }
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {banks.map((item, index) => {
          const myImage = cld.image(item.iconUrl);
          return (
            <CarouselItem
              key={index}
              className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <Card
                  onClick={() => {
                    setBank(item.name);
                  }}
                  className={`${
                    bank === item.name
                      ? "border-2 bg-toggle text-primary-foreground"
                      : "hover:bg-secondary/50 dark:hover:bg-toggle/80"
                  } border-0`}
                >
                  <CardContent className="cursor-pointer flex items-center justify-start w-full p-2 px-4 gap-4 truncate">
                    <div
                      className="min-h-5 min-w-5"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex flex-row justify-center items-center min-h-7 min-w-7 rounded-full bg-secondary dark:bg-white">
                      {myImage ? (
                        <AdvancedImage
                          className="w-4 h-4 object-cover rounded-full bg-white"
                          cldImg={myImage}
                          plugins={[responsive(), placeholder()]}
                        />
                      ) : (
                        <div className="flex justify-center items-center h-4 w-4 bg-foreground rounded-full">
                          <PiBankBold size={10} className="text-secondary" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm">{item.name}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="justify-center ml-14" />
      <CarouselNext className="justify-center mr-14" />
    </Carousel>
  );
};

export default SelectBank;

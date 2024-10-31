import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useMediaQuery from "@/app/hooks/useMediaQuery";

export function DonutPagination({ years, year, setYear }) {
  const [items, setItems] = useState("basis-1/6");
  const break1 = useMediaQuery("(max-width: 1020px)");
  const break2 = useMediaQuery("(max-width: 1080px)");
  const break3 = useMediaQuery("(max-width: 1500px)");
  const break4 = useMediaQuery("(min-width: 1500px)");
  useEffect(()=>{
    if(break1) {
      setItems("basis-1/4")
    } else if(break2) {
      setItems("basis-1/3")
    } else if(break3) {
      setItems("basis-1/4")
    } else if(break4) {
      setItems("basis-1/6")
    }
  },[break1,break2,break3,break4])
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full px-12 lg:px-20"
    >
      <CarouselContent>
        {years.map((item, index) => (
          <CarouselItem
            key={index}
            className={items}
          >
            <button
              className={`${
                year.toString() === (item).toString() ? "text-primary" : ""
              } w-full truncate p-1`}
              onClick={() =>
                setYear(item)
              }
            >
              <span className="text-xs sm:text-lg font-medium truncate text-ellipsis">
                {item}
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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function DonutPagination({ years, year, setYear }) {
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
            className="basis-1/4 md:basis-1/6 lg:basis-1/8"
          >
            <button
              className={`${
                year.toString() === (item).toString() ? "text-primary" : ""
              } p-1`}
              onClick={() =>
                setYear(item)
              }
            >
              <span className="text-xs sm:text-lg font-medium">
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

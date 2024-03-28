import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ToggleBank({ data, bank, setBank }) {
  if (!data || data.length === 0 || !bank) {
    return (
      <Skeleton className="hidden lg:flex h-full lg:h-[450px] w-full bg-secondary"></Skeleton>
    );
  }

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dohnlambm",
    },
  });
  const myImage = cld.image(data.find((item) => item.name === bank).iconUrl);
  return (
    <>
      <div className="hidden lg:flex flex-col justify-start items-start w-full gap-1">
        {data.map((item, index) => {
          const myImage = cld.image(item.iconUrl);
          return (
            <Button
              key={index}
              variant={`${item.name === bank ? "toggleActive" : "toggle"}`}
              onClick={() => {
                setBank(item.name);
              }}
            >
              <div
                className="min-h-4 min-w-4"
                style={{ backgroundColor: item.color }}
              ></div>
              <AdvancedImage
                className="w-6 h-6 object-cover rounded-full bg-white"
                cldImg={myImage}
                plugins={[responsive(), placeholder()]}
              />
              <span className="text-xs truncate text-ellipsis">
                {item.name}
              </span>
            </Button>
          );
        })}
      </div>
      <div className="lg:hidden flex flex-col sm:flex-row justify-center w-full gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex justify-center gap-2 px-5 sm:px-10 rounded-lg w-full sm:w-[300px]"
            >
              <div
                className="min-h-4 min-w-4"
                style={{
                  backgroundColor: data.find((item) => item.name === bank)
                    ?.color,
                }}
              ></div>
              <AdvancedImage
                className="w-6 h-6 object-cover rounded-full bg-white"
                cldImg={myImage}
                plugins={[responsive(), placeholder()]}
              />
              <span className="text-xs">{bank}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuRadioGroup
              value={bank}
              onValueChange={(v) => {
                setBank(v)
              }}
            >
              {data.map((item, index) => {
                const myImage = cld.image(item.iconUrl);
                return (
                  <DropdownMenuRadioItem
                    key={index}
                    value={`${item.name}`}
                    className="flex flex-row justify-start w-full pl-4 gap-3"
                  >
                    <div
                      className="min-h-4 min-w-4"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <AdvancedImage
                      className="w-6 h-6 object-cover rounded-full bg-white"
                      cldImg={myImage}
                      plugins={[responsive(), placeholder()]}
                    />
                    <span className="text-xs">{item.name}</span>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

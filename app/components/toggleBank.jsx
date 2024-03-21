import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
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
  const myImage = cld.image(bank.iconUrl);
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
              {/* <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
                <img src={item.iconUrl} className="h-4 w-4"></img>
              </div> */}
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
                className="w-20 h-20 object-cover rounded-full bg-white"
                cldImg={myImage}
                plugins={[responsive(), placeholder()]}
              />
              {/* <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
                <img src={icon} className="h-4 w-4"></img>
              </div> */}
              <span className="text-xs">{bank}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={bank}
              onValueChange={(v) => {
                navigate({
                  paramNameToUpdate: bankName,
                  newValue: v,
                });
              }}
            >
              {data.map((item, index) => {
                return (
                  <DropdownMenuRadioItem
                    key={index}
                    value={`${item.name}`}
                    className="flex flex-row justify-start w-full pl-10"
                  >
                    {item.name}
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

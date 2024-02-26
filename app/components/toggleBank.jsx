import { useRouter, useSearchParams } from "next/navigation";

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

export function ToggleBank({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bank = searchParams.get("bank") || data[0].name;
  const color = data.find((item) => item.name === bank).color;
  const icon = data.find((item) => item.name === bank).iconUrl;

  function navigate({ paramNameToUpdate, newValue }) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(paramNameToUpdate, newValue);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  }
  return (
    <>
      <div className="hidden lg:flex flex-col justify-start items-start w-full gap-1">
        {data.map((item, index) => {
          return (
            <Button
              key={index}
              variant={`${item.name === bank ? "toggleActive" : "toggle"}`}
              onClick={() => {
                navigate({
                  paramNameToUpdate: "bank",
                  newValue: item.name,
                });
              }}
            >
              <div
                className="min-h-4 min-w-4"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
                <img src={item.iconUrl} className="h-4 w-4"></img>
              </div>
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
                style={{ backgroundColor: color }}
              ></div>
              <div className="flex flex-row justify-center items-center min-h-6 min-w-6 rounded-full bg-secondary dark:bg-white">
                <img src={icon} className="h-4 w-4"></img>
              </div>
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
                  paramNameToUpdate: "bank",
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

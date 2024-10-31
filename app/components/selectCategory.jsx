import { useState } from "react";

import { FaSort } from "react-icons/fa";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function SelectCategory({ category, setCategory, search, categories, height, categoryName = "category" }) {
  const [open, setOpen] = useState(false);

  if(!category) {
    return (
      <Skeleton className="hidden lg:flex h-full lg:h-[600px] w-full bg-secondary"></Skeleton>
    );
  }

  return (
    <>
      <Command className={`${height ? height : "h-[600px]"} lg:sticky lg:top-14 hidden lg:flex flex-col w-full bg-transparent gap-5`}>
        {search && (
          <CommandInput
            placeholder="Search for..."
            className="border-0 ring-offset-0 active:border-0 focus-visible:ring-0"
          />
        )}
        <CommandList className="border-0 h-full w-full">
          <CommandGroup>
            <CommandEmpty>No results found.</CommandEmpty>
            {categories.map((item, index) => {
              return (
                <CommandItem
                  key={index}
                  className={`${
                    item.name === category
                      ? "bg-toggle hover:text-primary-foreground text-primary-foreground border-0 border-l-4 border-primary"
                      : "bg-secondary hover:text-primary-foreground"
                  }`}
                >
                  <button
                    className="h-10 w-full py-2.5 px-6 truncate text-ellipsis text-left text-xs"
                    onClick={() => {
                      setCategory(item.name)
                    }}
                  >
                    <span>{item.name}</span>
                  </button>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex lg:hidden justify-center gap-2 px-5 sm:px-10 rounded-lg w-full sm:w-[300px] text-xs"
          >
            {category || "Select Category..."}
            <FaSort className="shrink-0 h-4 w-4 ml-2 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`${height ? height : "h-[500px]"} w-[300px] p-2 bg-secondary dark:bg-[#2E2B54]`}>
          <Command className="bg-transparent h-full w-full">
            {search && (
              <CommandInput
                placeholder="Search for..."
                className="border-0 ring-offset-0 active:border-0 focus-visible:ring-0"
              />
            )}
            <CommandList className="border-0 h-full w-full">
              <CommandGroup>
                <CommandEmpty>No results found.</CommandEmpty>
                {categories.map((item, index) => {
                  return (
                    <CommandItem
                      key={index}
                      className={`${
                        item.name === category
                          ? " bg-toggle hover:text-primary-foreground text-primary-foreground border-0 border-l-4 border-primary"
                          : "bg-secondary hover:text-primary-foreground"
                      }`}
                    >
                      <button
                        className="h-10 w-full py-2.5 px-6 truncate text-ellipsis text-left text-xs"
                        onClick={() => {
                          setOpen(false);
                          setCategory(item.name)
                        }}
                      >
                        <span>{item.name}</span>
                      </button>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SelectCategory({categories, category, setCategory}) {
  return (
    <Command className="bg-transparent h-full">
      <CommandInput placeholder="Search for..." className="border-0 ring-offset-0 active:border-0 focus-visible:ring-0" />
      <CommandList className="border-0 h-full">
        <CommandGroup>
          <CommandEmpty>No results found.</CommandEmpty>
          {categories.map((item,index)=>{
            return (
              <CommandItem key={index} className={`${item.name === category ? "border-0 border-l-4 border-primary bg-toggle" : "bg-secondary"}`}>
                <button className="text-left text-xs w-full h-full px-6 py-2.5" onClick={()=>{setCategory(item.name)}}><span>{item.name}</span></button>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

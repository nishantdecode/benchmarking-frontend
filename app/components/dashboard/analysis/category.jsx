import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { BiCategory } from "react-icons/bi";
import OptionButtons from "./optionButtons";

const Category = ({ categories, category, setCategory }) => {
  return (
    <>
      <div className="hidden lg:flex flex-col justify-start w-full gap-2">
        {categories.map((item, index) => {
          return (
            <Button
              key={index}
              variant={`${category === item.category ? 'selectActive' : 'select'}`}
              onClick={()=>{setCategory(item.category)}}
            >
              {item.category}
            </Button>
          );
        })}
      </div>
      <div className="flex flex-col sm:flex-row justify-between lg:hidden w-full gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex justify-center gap-2 px-5 sm:px-10 rounded-lg w-full sm:w-[300px]"
            >
              <BiCategory size={20} /> {category}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={category}
              onValueChange={setCategory}
            >
              {categories.map((item, index) => {
                return (
                  <DropdownMenuRadioItem key={index} value={`${item.category}`}>
                    {item.category}
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <OptionButtons/>
      </div>
    </>
  );
};

export default Category;

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { BsFiletypePdf } from "react-icons/bs";
import { BsFiletypePng } from "react-icons/bs";
import { BsFiletypeXls } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const OptionButtons = ({
  type,
  view,
  navigate,
  downloadPDF,
  downloadImage,
  downloadSheet,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.split("/")[pathname.split("/").length - 1];
  return (
    <div className="flex flex-row gap-1">
      {type === "chart" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="flex justify-between w-full sm:w-auto gap-2 text-xs"
            >
              <div className="flex flex-row gap-2 text-primary font-bold">Export as</div>
              <IoIosArrowDown size={16} className="flex dark:text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuRadioGroup
              value=""
              onValueChange={(v) => {}}
              className="flex flex-col gap-2"
            >
              <DropdownMenuItem value="pdf" onClick={downloadPDF}>
                <div className="flex flex-row justify-start gap-2">
                  <BsFiletypePdf size={15} className="mt-0.5" />
                  <div>Export as PDF</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem value="png" onClick={downloadImage}>
                <div className="flex flex-row justify-start gap-2">
                  <BsFiletypePng size={15} className="mt-0.5" />
                  <div>Export as PNG</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="flex justify-between w-full sm:w-auto gap-2 text-xs"
            >
              <div className="flex flex-row gap-2 text-primary font-bold">Export as</div>
              <IoIosArrowDown size={16} className="flex dark:text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuRadioGroup
              value=""
              onValueChange={(v) => {}}
              className="flex flex-col gap-2"
            >
              <DropdownMenuItem value="xls" onClick={downloadSheet}>
                <div className="flex flex-row justify-start gap-2">
                  <BsFiletypeXls size={15} className="mt-0.5" />
                  <div>Export as XLS</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {view && (
        <Button
          size="sm"
          variant="default"
          className="flex justify-center w-full sm:w-auto py-0 md:px-6 text-xs"
        >
          View
        </Button>
      )}
      {navigate && (
        <Button
          size="sm"
          variant="default"
          className="flex py-0 text-xs justify-center w-full sm:w-auto"
          onClick={() =>
            page === "singleBank"
              ? router.push("/dashboard/size/multiBank")
              : router.push("/dashboard/size/singleBank")
          }
        >
          {page === "singleBank" ? "Compare Banks" : "Individual Banks"}
        </Button>
      )}
    </div>
  );
};

export default OptionButtons;

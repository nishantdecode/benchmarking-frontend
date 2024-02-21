import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";

import { usePathname, useRouter } from "next/navigation";

const OptionButtons = () => {
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.split("/")[pathname.split("/").length - 1];
  return (
    <div className="flex flex-row gap-1">
      <Button
        variant="outline"
        className="flex py-0 text-xs justify-center w-full sm:w-auto gap-2"
      >
        Export as <IoIosArrowDown size={16} className="text-primary" />
      </Button>
      <Button
        variant="default"
        className="flex py-0 text-xs justify-center w-full sm:w-auto"
        onClick={() =>
          page === "singleBank"
            ? router.push("/size/multiBank")
            : router.push("/size/singleBank")
        }
      >
        Compare Banks
      </Button>
    </div>
  );
};

export default OptionButtons;

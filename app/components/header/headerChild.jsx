import React from "react";
import { useRouter } from "next/navigation"; 

import { FaArrowCircleLeft } from "react-icons/fa";

const HeaderChild = ({ title, icon, link }) => {
  const router = useRouter();
  return (
    <div className="fixed top-0 flex flex-col justify-center w-full h-12 z-50 drop-shadow-lg bg-card dark:bg-card border-background">
      <div className="flex flex-row pl-5 gap-2 font-medium text-foreground">
        <FaArrowCircleLeft
          size={25}
          onClick={() => {
            router.push(link);
          }}
          className="mt-1"
        />
        {icon}
        <h1 className="pl-1 text-lg sm:text-2xl text-foreground dark:text-foreground">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default HeaderChild;

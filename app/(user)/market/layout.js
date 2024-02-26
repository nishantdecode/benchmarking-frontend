import React from "react";

import { RiPieChart2Fill } from "react-icons/ri";

import Header from "@/app/components/header/header";

const MarketLayout = ({ children }) => {
  return (
    <>
      <div className="h-auto w-full">
        <Header title="Market Share" icon={<RiPieChart2Fill size={32} />} />
        {children}
      </div>
    </>
  );
};

export default MarketLayout;

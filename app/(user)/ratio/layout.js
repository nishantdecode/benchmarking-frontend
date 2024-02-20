import React from "react";

import { PiMathOperationsFill } from "react-icons/pi";

import Header from "@/app/components/header/header";

const RatioLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen">
        <Header title="Key Ratio" icon={<PiMathOperationsFill size={32} />} />
        {children}
      </div>
    </>
  );
};

export default RatioLayout;

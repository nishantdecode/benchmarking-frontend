import React from "react";

import { PiSigmaFill } from "react-icons/pi";

import Header from "@/components/header/header";

const SummaryLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen">
        <Header title="Executive Summary" icon={<PiSigmaFill size={32} />} />
        {children}
      </div>
    </>
  );
};

export default SummaryLayout;

import React from "react";

import { IoIosListBox } from "react-icons/io";

import Header from "@/components/header/header";

const AnalysisLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen">
        <Header title="Item Analysis" icon={<IoIosListBox size={32} />} />
        {children}
      </div>
    </>
  );
};

export default AnalysisLayout;

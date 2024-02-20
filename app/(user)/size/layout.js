import React from "react";

import { IoBarChart } from "react-icons/io5";

import Header from "@/app/components/header/header";

const SizeLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen">
        <Header title="Common Size" icon={<IoBarChart size={32} />} />
        {children}
      </div>
    </>
  );
};

export default SizeLayout;

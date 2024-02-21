import React from "react";

import { BiSolidBank } from "react-icons/bi";

import Header from "@/app/components/header/header";

const BankLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen">
        <Header title="Individual Banks" icon={<BiSolidBank size={32}/>}/>
        {children}
      </div>
    </>
  );
};

export default BankLayout;

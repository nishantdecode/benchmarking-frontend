import React from "react";

import { MdSpaceDashboard } from "react-icons/md";

import Header from "@/components/header/header";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen">
        <Header title="Dashboard" icon={<MdSpaceDashboard size={32} />} />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;

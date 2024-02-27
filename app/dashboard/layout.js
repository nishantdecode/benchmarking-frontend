"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Header from "../components/header/header";
import Navbar from "@/app/components/navbar/navbar";

const DashboardLayout = async ({ children }) => {
  const pathname = usePathname();
  return (
    <div>
      {pathname !== "/dashboard/login" && (
        <>
          <Header pathname={pathname} />
          <Navbar />
        </>
      )}
      {children}
    </div>
  );
};

export default DashboardLayout;

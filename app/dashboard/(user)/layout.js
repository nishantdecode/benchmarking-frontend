'use client'

import React from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/app/components/navbar/navbar";
import Header from "@/app/components/header/header";

const UserLayout = async ({ children }) => {
  const pathname = usePathname();
  return (
    <div>
      <Header pathname={pathname}/>
      <Navbar/>
      {children}
    </div>
  );
};

export default UserLayout;

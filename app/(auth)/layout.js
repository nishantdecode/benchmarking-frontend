import React from "react";

import HeaderAuth from "@/app/components/header/headerAuth";

import { Card } from "@/components/ui/card";
import ClientOnly from "@/app/components/ClientOnly";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-start align-middle h-screen w-full bg-gradient-to-r from-secondary to-card p-3">
      <div className="flex flex-row justify-between w-full flex-shrink-0">
        <ClientOnly>
          <HeaderAuth />
        </ClientOnly>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Card className="flex flex-col justify-center items-center h-auto w-full sm:w-1/2 md:w-1/3 p-8 sm:p-10 md:p-12">
          {children}
        </Card>
      </div>
    </div>
  );
};

export default Layout;

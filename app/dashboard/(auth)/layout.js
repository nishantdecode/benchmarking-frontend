"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";

import ClientOnly from "@/app/components/ClientOnly";
import Header from "@/app/components/header/header";

const LoginLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-start align-middle h-screen w-full bg-gradient-to-r from-gray-400/10 dark:from-secondary to-gray-100/10 dark:to-card p-3">
      <div className="flex flex-row justify-between w-full flex-shrink-0 z-50">
        <ClientOnly>
          <Header pathname={pathname} />
        </ClientOnly>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="fixed top-[-12%] left-10 bg-gradient-to-r from-slate-900/20 dark:from-card/10 to-gray-100/15 dark:to-white/15 h-[500px] w-[500px] rounded-full"></div>
        <Card className="flex flex-col justify-center items-center shadow-lg bg-white/50 dark:bg-white/10 rounded-2xl border-0 h-auto w-full sm:w-1/2 md:w-[520px] p-8 sm:p-10 md:p-12 z-50">
          {children}
        </Card>
        <div className="fixed top-[100%] md:top-[55%] left-[60%] bg-gradient-to-r from-slate-900/20 dark:from-card/10 to-gray-100/15 dark:to-white/15 h-[200px] w-[200px] rounded-full"></div>
        <div className="fixed top-[65%] left-[65%] bg-gradient-to-r from-slate-900/20 dark:from-secondary/10 to-gray-100/15 dark:to-secondary/5 h-[400px] w-[400px] rounded-full"></div>
      </div>
    </div>
  );
};

export default LoginLayout;

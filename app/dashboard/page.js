"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { IoIosArrowForward } from "react-icons/io";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/overview");
  }, [router]);
  return (
    <>
      <div className="fixed top-0 flex flex-col justify-center w-full h-12 bg-card dark:bg-card border-background drop-shadow-lg z-50">
        <Skeleton className="flex flex-row justify-start items-center h-full w-full bg-card pl-5">
          <Skeleton className="h-2/3 w-[200px] bg-background" />
        </Skeleton>
      </div>
      <Skeleton className="fixed top-0 flex flex-col justify-center w-2 h-screen bg-card dark:bg-card">
        <Skeleton className="flex flex-col justify-center align-middle w-5 h-16 rounded-r-full bg-card dark:bg-card">
          <IoIosArrowForward className="text-primary font-bold size-6" />
        </Skeleton>
      </Skeleton>
    </>
  );
};

export default Dashboard;

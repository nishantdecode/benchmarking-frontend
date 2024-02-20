'use client'

import React from "react";

import { useTheme } from "next-themes";

import { BsFillPieChartFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

import { Button } from "@/components/ui/button";

const HeaderAuth = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="flex flex-row justify-start gap-2">
        <BsFillPieChartFill className="mt-1" size={28} />
        <h1 className="text-2xl mt-0.5 font-semibold">Benchmarking</h1>
      </div>
      <Button
        variant="link"
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        {theme === "dark" ? (
          <MdDarkMode size={20} />
        ) : (
          <MdOutlineLightMode size={20} />
        )}
      </Button>
    </>
  );
};

export default HeaderAuth;

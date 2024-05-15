import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
  MdDarkMode,
  MdOutlineLightMode,
  MdSpaceDashboard,
} from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { BiSolidBank } from "react-icons/bi";
import { IoIosListBox } from "react-icons/io";
import { FaRankingStar } from "react-icons/fa6";
import { RiPieChart2Fill } from "react-icons/ri";
import { FaArrowCircleLeft } from "react-icons/fa";
import { BsFillPieChartFill } from "react-icons/bs";
import { IoBarChart, IoTrendingUpSharp } from "react-icons/io5";
import { PiMathOperationsFill, PiSigmaFill } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import ClientOnly from "../ClientOnly";
import { Card } from "@/components/ui/card";

const Header = ({ pathname }) => {
  const router = useRouter();
  const page = pathname?.split("/");
  const { theme, setTheme } = useTheme();
  let title = null;
  let icon = null;
  switch (page[page.length - 1]) {
    case "overview":
      title = "Dashboard";
      icon = <MdSpaceDashboard size={32} />;
      break;
    case "trendAnalysis":
      title = "Trend & Competitive Analysis";
      icon = <IoTrendingUpSharp size={32} />;
      break;
    case "market":
      title = "Market Share";
      icon = <RiPieChart2Fill size={32} />;
      break;
    case "ratio":
      title = "Key Ratio";
      icon = <PiMathOperationsFill size={32} />;
      break;
    case "analysis":
      title = "Item Analysis";
      icon = <IoIosListBox size={32} />;
      break;
    case "singleBank":
      title = "Common Size";
      icon = <IoBarChart size={32} />;
      break;
    case "multiBank":
      title = "Common Size";
      icon = <IoBarChart size={32} />;
      break;
    case "summary":
      title = "Executive Summary";
      icon = <PiSigmaFill size={32} />;
      break;
    case "banks":
      title = "Individual Banks";
      icon = <BiSolidBank size={32} />;
      break;
    case "ranking":
      title = "Rankings";
      icon = <FaRankingStar size={32} />;
      break;
    case "login":
      title = "Benchmarking";
      icon = <BsFillPieChartFill className="mt-1" size={28} />;
      break;
    case "forgetPassword":
      title = "Benchmarking";
      icon = <BsFillPieChartFill className="mt-1" size={28} />;
      break;
    case "resetPassword":
      title = "Benchmarking";
      icon = <BsFillPieChartFill className="mt-1" size={28} />;
      break;
    case "admin":
      title = "Admin Profile";
      icon = <RxAvatar size={32} />;
      break;
    case "user":
      title = "Admin Profile";
      icon = <RxAvatar size={32} />;
      break;
    case "bank":
      title = "Admin Profile";
      icon = <RxAvatar size={32} />;
      break;
    default:
      break;
  }

  if (title === "Trend & Competitive Analysis") {
    return (
      <div className="fixed top-0 flex flex-col justify-center w-full h-12 z-50 drop-shadow-lg bg-card dark:bg-card border-background">
        <div className="flex flex-row pl-5 gap-2 font-medium text-foreground">
          <FaArrowCircleLeft
            size={25}
            onClick={() => {
              router.push("/dashboard");
            }}
            className="cursor-pointer mt-1"
          />
          {icon}
          <h1 className="pl-1 text-lg sm:text-2xl text-foreground dark:text-foreground">
            {title}
          </h1>
        </div>
      </div>
    );
  } else if (title === "Benchmarking") {
    return (
      <div className="flex flex-row justify-between w-full flex-shrink-0 z-50">
        <ClientOnly>
          <div className="flex flex-row justify-start gap-2">
            {icon}
            <h1 className="text-2xl mt-0.5 font-bold">{title}</h1>
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
        </ClientOnly>
      </div>
    );
  } else {
    return (
      <div className="fixed top-0 flex flex-col justify-center h-12 w-full z-50 drop-shadow-lg bg-card border-background">
        <div className="flex flex-row pl-5 font-medium text-foreground">
          {icon}
          <h1 className="pl-1 text-lg sm:text-2xl text-foreground">{title}</h1>
        </div>
      </div>
    );
  }
};

export default Header;

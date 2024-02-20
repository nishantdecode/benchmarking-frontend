"use client";

import React from "react";

import { MdSpaceDashboard } from "react-icons/md";
import { RiPieChart2Fill } from "react-icons/ri";
import { PiMathOperationsFill } from "react-icons/pi";
import { IoIosListBox } from "react-icons/io";
import { IoBarChart } from "react-icons/io5";
import { PiSigmaFill } from "react-icons/pi";
import { BiSolidBank } from "react-icons/bi";
import { FaRankingStar } from "react-icons/fa6";

import { Button } from "../../../components/ui/button";
import { Div } from "@/components/ui/div";

const navItems = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: <MdSpaceDashboard size={20} />,
  },
  {
    title: "Market Share",
    route: "/market",
    icon: <RiPieChart2Fill size={20} />,
  },
  {
    title: "Key Ratio",
    route: "/ratio",
    icon: <PiMathOperationsFill size={20} />,
  },
  {
    title: "Item Analysis",
    route: "/analysis",
    icon: <IoIosListBox size={20} />,
  },
  {
    title: "Common Size",
    route: "/size/singleBank",
    icon: <IoBarChart size={20} />,
  },
  {
    title: "Executive Summary",
    route: "/summary",
    icon: <PiSigmaFill size={20} />,
  },
  {
    title: "Individual Banks",
    route: "/bank",
    icon: <BiSolidBank size={20} />,
  },
  {
    title: "Rankings",
    route: "/ranking",
    icon: <FaRankingStar size={20} />,
  },
];

const MenuList = ({ pathname, router }) => {
  const parentPath = pathname.split('/')[1];
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {navItems.map((navItem, index) => {
        const variant = navItem.route.startsWith('/' + parentPath) ? "default" : "link";
        return (
          <Div key={index} variant={variant} className="w-full" onClick={()=>{router.push(navItem.route)}}>
              {navItem.icon}
              <div>{navItem.title}</div>
          </Div>
        );
      })}
    </div>
  );
};

export default MenuList;

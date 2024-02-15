"use client";

import React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillPieChartFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";

import MenuList from "./menuList";

const Navbar = ({pathname, router, user}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Drawer direction="left" className="h-full">
        <DrawerTrigger asChild>
          <div className="fixed flex flex-col justify-center w-2 h-screen bg-card dark:bg-card">
            <div className="flex flex-col justify-center align-middle w-5 h-16 rounded-r-full bg-card dark:bg-card">
              <IoIosArrowForward className="text-primary font-bold size-6" />
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="border-b-[2px] border-border pb-2 flex-grow-0">
            <DrawerTitle>
              <div className="flex flex-row gap-2 py-2">
                <BsFillPieChartFill className="mt-1" size={28} />
                <h1 className="text-2xl mt-0.5">Benchmarking</h1>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 flex-grow">
            <DrawerClose>
              <MenuList pathname={pathname} router={router}/>
            </DrawerClose>
          </div>
          <DrawerFooter className="border-t-[2px] border-border pt-2 flex-shrink-0">
            <Button
              variant="link"
              className="w-full"
              onClick={() => {
                theme === "dark" ? setTheme("light") : setTheme("dark");
              }}
            >
              {theme === "dark" ? (
                <MdDarkMode size={20} />
              ) : (
                <MdOutlineLightMode size={20} />
              )}
              <div>{theme} Mode</div>
            </Button>
            <Button variant="link" className="w-full">
              <RxAvatar size={20} />
              {user && <div>{user.name.first} {user.name.last}</div>}
              {!user && <div>User name</div>}
            </Button>
            <Button variant="destructive" className="w-full font-bold">
              <LuLogOut size={20} />
              <div>Logout</div>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Navbar;

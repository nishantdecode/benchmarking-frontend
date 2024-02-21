"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/lib/features/services/authApi";
import { setAuthenticated, setUser } from "@/lib/features/slices/authSlice";

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
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillPieChartFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";

import MenuList from "./menuList";
import { LogoutDialog } from "./logoutDialog";
import logoutAction from "@/app/actions/logoutAction";


const Navbar = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  useEffect(()=>{
    dispatch(setUser(user));
    dispatch(setAuthenticated(true));
  },[dispatch,user])
  const handleLogout = async () => {
    await logoutAction()
    router.push("./login");
  };
  return (
    <div>
      <Drawer direction="left" className="h-full">
        <DrawerTrigger asChild>
          <div className="fixed top-0 flex flex-col justify-center w-2 h-screen bg-card dark:bg-card">
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
              <MenuList pathname={pathname} router={router} />
            </DrawerClose>
          </div>
          <DrawerFooter className="border-t-[2px] border-border pt-2 flex-shrink-0">
            <Button
              variant="link"
              className="w-full gap-3"
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
            <Button variant="link" className="w-full gap-3">
              <RxAvatar size={20} />
              {user && (
                <div>
                  {user.name.first} {user.name.last}
                </div>
              )}
              {!user && (
                <div>
                  username
                </div>
              )}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full font-bold gap-3">
                  <LuLogOut size={20} />
                  <div>Logout</div>
                </Button>
              </AlertDialogTrigger>
              <LogoutDialog handleLogout={handleLogout}/>
            </AlertDialog>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Navbar;

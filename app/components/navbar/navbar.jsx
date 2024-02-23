"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
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


const Navbar = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();

  const [username, setUsername] = useState('username')
  const [role, setRole] = useState('User')

  useEffect(()=>{
    if (typeof window !== "undefined" && window.localStorage) {
      const user = JSON.parse(localStorage.getItem("user"));
      const name = user?.name.first + " " + user?.name.last
      setUsername(name)
      setRole(user?.role)
      dispatch(setUser(user));
      dispatch(setAuthenticated(true));
    }
  },[dispatch])

  const handleLogout = () => {
    dispatch(setUser(undefined));
    dispatch(setAuthenticated(false));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
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
            <Button variant={`${pathname === '/admin' ? 'default' : 'link'}`} className="w-full gap-3" onClick={()=>{role === 'Admin' ? router.push('/admin') : router.push('/dashboard')}}>
              <RxAvatar size={20} />
              <div>
                {username}
              </div>
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

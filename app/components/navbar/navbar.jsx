"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Cloudinary } from "@cloudinary/url-gen";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { setAuthenticated, setUser } from "@/lib/features/slices/authSlice";

import { RxAvatar } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import { MdDarkMode } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillPieChartFill } from "react-icons/bs";
import { MdOutlineLightMode } from "react-icons/md";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import MenuList from "./menuList";
import showToast from "@/util/showToast";
import { LogoutDialog } from "./logoutDialog";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const user = useSelector((state) => state.auth.user);

  const [publicId, setPublicId] = useState(user?.picture);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dohnlambm",
    },
  });
  const myImage = cld.image(publicId);

  const handleLogout = () => {
    dispatch(setUser(undefined));
    dispatch(setAuthenticated(false));
    router.push("/dashboard/login");
    localStorage.removeItem("accessToken");
    showToast("Logged Out!", "Please Login.");
  };

  useEffect(() => {
    if (user) {
      setPublicId(user.picture);
    }
  }, [user]);

  return (
    <div>
      <Drawer direction="left" className="select-none h-full">
        <DrawerTrigger asChild className="select-none">
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
              <div>
                {theme && theme[0]?.toUpperCase() + theme?.slice(1)} Mode
              </div>
            </Button>
            <Button
              variant={`${
                pathname === "/dashboard/admin" ? "default" : "link"
              }`}
              className="w-full gap-3"
              onClick={() => {
                router.push("/dashboard/admin");
              }}
            >
              {publicId ? (
                <AdvancedImage
                  className="w-6 h-6 object-cover border-[1px] rounded-full bg-white"
                  cldImg={myImage}
                  plugins={[responsive(), placeholder()]}
                />
              ) : (
                <RxAvatar size={20} className="text-foreground" />
              )}
              <div>
                {user?.name?.first} {user?.name?.last}
              </div>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full font-bold gap-3"
                >
                  <LuLogOut size={20} />
                  <div>Logout</div>
                </Button>
              </AlertDialogTrigger>
              <LogoutDialog handleLogout={handleLogout} />
            </AlertDialog>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Navbar;

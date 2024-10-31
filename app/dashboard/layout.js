"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { setAuthenticated, setUser } from "@/lib/features/slices/authSlice";
import {
  useRefreshMutation,
  useVerifyTokenMutation,
} from "@/lib/features/services/authApi";
import { useGetAllBanksMutation } from "@/lib/features/services/bankApi";

import showToast from "@/util/showToast";
import Header from "../components/header/header";
import Navbar from "@/app/components/navbar/navbar";
import { setBanks } from "@/lib/features/slices/bankSlice";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const page = pathname.split("/");

  let accessToken = null;
  if (typeof window !== "undefined" && window.localStorage) {
    accessToken = localStorage.getItem("accessToken");
  }

  const noLayoutPrefixes = [
    "login",
    "user",
    "bank",
    "forgetPassword",
    "resetPassword",
  ];

  const noAuthPrefixes = ["login", "forgetPassword", "resetPassword"];

  const [verify, { isLoading, error }] = useVerifyTokenMutation();
  const [refresh] = useRefreshMutation();
  const [getAllBanks] = useGetAllBanksMutation();

  const verifyUser = async () => {
    try {
      if (accessToken) {
        let user = null;
        let response = await verify({ token: accessToken });
        if (response.error) {
          response = await refresh({ token: accessToken });
          if (response.error) {
            throw response.error;
          }
          localStorage.setItem("accessToken", response.data.result.token);
        }
        user = response.data.result.userObj;
        const bankResponse = await getAllBanks();
        if(bankResponse.data) {
          dispatch(setBanks(bankResponse.data.result))
        }
        dispatch(setUser(user));
        dispatch(setAuthenticated(true));
      } else {
        showToast("Logged out!", "Please Login again.");
        router.push("/dashboard/login");
      }
    } catch (err) {
      showToast("Token Expired!", "Please Login again.");
      router.push("/dashboard/login");
    }
  };

  useEffect(() => {
    if (!noAuthPrefixes.includes(page[page.length - 1])) {
      verifyUser();
    }
  }, []);

  return (
    <div>
      {!noLayoutPrefixes.includes(page[page.length - 1]) && (
        <>
          <Header pathname={pathname} />
          <Navbar />
        </>
      )}
      {children}
    </div>
  );
};

export default DashboardLayout;

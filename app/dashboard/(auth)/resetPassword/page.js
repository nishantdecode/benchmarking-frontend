"use client";

import React, { useState } from "react";

import { IoEye, IoEyeOff } from "react-icons/io5";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/lib/features/services/authApi";
import showToast from "@/util/showToast";

const formSchema = z.object({
  newPassword: z.string().min(3),
  confirmNewPassword: z.string().min(3),
});

const ResetPassword = () => {
  const [type, setType] = useState("password");
  const [ctype, setCType] = useState("password");

  const router = useRouter();
  const searchParams = useSearchParams();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleCToggle = () => {
    if (ctype === "password") {
      setCType("text");
    } else {
      setCType("password");
    }
  };

  const handleSubmit = async (values) => {
    const credentials = {
      email: searchParams.get("email"),
      newPassword: values.newPassword,
    };
    try {
      if (values.newPassword === values.confirmNewPassword) {
        const response = await resetPassword(credentials);
        if (!response.error) {
          showToast("Successfully password Reset!", "Please Login.");
          router.push(`/dashboard/login`);
        } else {
          showToast("Error!", response.error.data.message);
        }
      } else {
        showToast("Passwords do not match!", undefined);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };
  return (
    <>
      <div className="w-full font-bold text-left text-xl md:text-2xl pb-6 md:mb-8">
        Reset Password
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <FormLabel className="select-none min-w-[170px] mt-3 text-xs md:text-sm">
                      Enter new Password* :
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-full md:max-w-[300px]">
                        <Input
                          placeholder="New Password"
                          type={type}
                          {...field}
                          className="md:max-w-[300px]"
                        />
                        <span
                          className="absolute right-2 top-1.5 bottom-0 m-auto cursor-pointer"
                          onClick={handleToggle}
                        >
                          {type === "password" ? (
                            <IoEyeOff size={25} />
                          ) : (
                            <IoEye size={25} />
                          )}
                        </span>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <FormLabel className="select-none min-w-[170px] mt-3 text-xs md:text-sm">
                      Confirm new Password* :
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-full md:max-w-[300px]">
                        <Input
                          placeholder="Confirm Password"
                          type={ctype}
                          {...field}
                          className="md:max-w-[300px]"
                        />
                        <span
                          className="absolute right-2 top-1.5 bottom-0 m-auto cursor-pointer"
                          onClick={handleCToggle}
                        >
                          {ctype === "password" ? (
                            <IoEyeOff size={25} />
                          ) : (
                            <IoEye size={25} />
                          )}
                        </span>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex flex-row w-full justify-center md:justify-end mt-2 md:mt-5">
            <Button
              size="sm"
              variant="default"
              type="submit"
              className="select-none w-auto text-xs justify-center px-8 py-0 rounded-xl"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ResetPassword;

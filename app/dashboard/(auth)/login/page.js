"use client";

import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/lib/features/services/authApi";

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

import showToast from "@/util/showToast";
import { IoEye, IoEyeOff } from "react-icons/io5";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const Login = () => {
  const [type, setType] = useState("password");

  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "superadmin12@gmail.com",
      password: "superadmin",
    },
  });

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleSubmit = async (values) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };

    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const response = await login(credentials);
        if (response.data) {
          localStorage.setItem("accessToken", response.data.result.token);
          router.push("/");
        } else {
          if (Number(response.error.status) >= 500)
            showToast("Server Error", response.error.data.message);
          else showToast("Login Error", response.error.data.message);
        }
      }
    } catch (err) {
      showToast("Error Logging In!", "Please try again later.");
    }
  };
  return (
    <>
      <div className="w-full font-bold text-left text-xl md:text-2xl pb-6 md:mb-8">
        Log in
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <FormLabel className="text-xs md:text-sm">
                      Email* :
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        type="email"
                        {...field}
                        className="md:max-w-[300px]"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <FormLabel className="mt-3 text-xs md:text-sm">
                      Password* :
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-full md:max-w-[300px]">
                        <Input
                          placeholder="Password"
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
          <div className="flex flex-row w-full justify-center md:justify-end mt-2 md:mt-5">
            <Button
              size="sm"
              variant={isLoading ? "ghost" : "default"}
              type="submit"
              className="select-none w-auto text-xs justify-center px-8 py-0 rounded-xl"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex flex-row w-full justify-center md:justify-start">
        <Button
          variant="link"
          className="select-none p-0 text-xs md:mt-[-40px]"
          onClick={() => router.push("/dashboard/forgetPassword")}
        >
          Forget Password?
        </Button>
      </div>
    </>
  );
};

export default Login;

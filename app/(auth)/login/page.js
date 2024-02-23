"use client";

import React from "react";

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

import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/lib/features/services/authApi";

const formSchema = z.object({
  loginID: z.string().min(36),
  password: z.string().min(3),
});

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginID: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    const credentials = {
      loginID: values.loginID,
      password: values.password,
    };

    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const response = await login(credentials);
        if (response.data) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          router.push("./dashboard");
        }
      } else {
        console.log("Login failed:", response.data.error);
      }
    } catch (err) {
      console.log("Login error:", err);
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
            name="loginID"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <FormLabel className="text-xs md:text-sm">
                      Login ID* :
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="loginID"
                        type="loginID"
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
                      <Input
                        placeholder="password"
                        type="password"
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
          <div className="flex flex-row w-full justify-center md:justify-end mt-2 md:mt-5">
            <Button
              size="sm"
              variant="default"
              type="submit"
              className="w-auto text-xs justify-center px-8 py-0 rounded-xl"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex flex-row w-full justify-center md:justify-start">
        <Button
          variant="link"
          className="p-0 text-xs md:mt-[-40px]"
          onClick={() => router.push("/forgetPassword")}
        >
          Forget Password?
        </Button>
      </div>
    </>
  );
};

export default Login;

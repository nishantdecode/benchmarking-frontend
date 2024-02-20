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
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/lib/features/services/authApi";
import { setAuthenticated, setUser } from "@/lib/features/slices/authSlice";

const formSchema = z.object({
  loginID: z.string(),
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
      const response = await login(credentials);
      if (response.data) {
        router.push("./dashboard");
      } else {
        console.log("Login failed:", response.data.error);
      }
    } catch (err) {
      console.log("Login error:", err);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="loginID"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Login ID*</FormLabel>
                <FormControl>
                  <Input placeholder="loginID" type="loginID" {...field} />
                </FormControl>
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
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          variant="default"
          type="submit"
          className="w-full justify-center"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Login;

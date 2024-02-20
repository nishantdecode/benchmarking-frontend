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
  EmailID: z.string().email(),
});

const ForgetPassword = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      EmailID: "",
    },
  });

  const handleSubmit = async (values) => {
    const credentials = {
      EmailID: values.EmailID,
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
    <>
      <div className="w-full font-bold text-left text-xl md:text-2xl pb-6 md:mb-8">
        Forget Password
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="EmailID"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <FormLabel className="text-xs md:text-sm">
                      Enter your registered Email ID* :
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Email ID"
                        type="EmailID"
                        {...field}
                        className="w-full md:max-w-[250px]"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="w-full text-center md:text-end text-[10px]">
            We will send an OTP at this Email ID
          </div>
          <div className="flex flex-col-reverse md:flex-row w-full justify-center md:justify-end mt-2 md:mt-5">
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
          size="sm"
          variant="outline"
          className="px-3 text-xs md:mt-[-35px] rounded-xl"
          onClick={() => router.push("/login")}
        >
          Back to Login ?
        </Button>
      </div>
    </>
  );
};

export default ForgetPassword;

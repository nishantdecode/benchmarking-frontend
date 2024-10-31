"use client";

import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/lib/features/services/authApi";

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
import OtpInput from "@/app/components/otpInput";

const formSchema = z.object({
  email: z.string().email(),
});

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verify, setVerify] = useState(false);
  const [sendOtp, { isLoading, error }] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values) => {
    const credentials = {
      email: values.email,
    };
    try {
      const response = await sendOtp(credentials);
      if (!response.error) {
        setEmail(credentials.email);
        setVerify(true);
      } else {
        showToast("Error!", response.error.data.message);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  const handleVerify = async (otp) => {
    const credentials = {
      email: email,
      otp: otp,
    };

    try {
      const response = await verifyOtp(credentials);
      if (!response.error) {
        router.push(`/dashboard/resetPassword?email=${email}`);
      } else {
        showToast("Error!", response.error.data.message);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  if (verify) {
    return (
      <div className="">
        <div className="w-full font-bold text-center text-xl md:text-2xl pb-6">
          Enter OTP
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-4">
          <div className="w-full text-center text-md">
            Enter the OTP from your Registered Email ID
          </div>
          <OtpInput onOtpSubmit={handleVerify} />
          <div className="flex flex-row w-full justify-center mt-2 md:mt-5">
            <Button
              size="sm"
              variant="outline"
              className="px-3 text-xs rounded-xl"
              onClick={() => router.push("/dashboard/login")}
            >
              Back to Login ?
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
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
              name="email"
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
                          type="email"
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
        <div className="flex flex-row w-full justify-center md:justify-start mt-2 lg:mt-0">
          <Button
            size="sm"
            variant="outline"
            className="px-3 text-xs md:mt-[-35px] rounded-xl"
            onClick={() => router.push("/dashboard/login")}
          >
            Back to Login ?
          </Button>
        </div>
      </>
    );
  }
};

export default ForgetPassword;

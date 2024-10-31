"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import { MdDelete } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { FaArrowCircleLeft } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import UploadButton from "@/app/components/upload";
import {
  useCreateBankMutation,
  useGetBankMutation,
  useUpdateBankMutation,
} from "@/lib/features/services/bankApi";
import showToast from "@/util/showToast";

const formSchema = z.object({
  name: z.string().min(1),
  headquarters: z.string().min(1),
  code: z.string().min(1),
  contact: z.string().min(1),
  dataUrl: z.string().min(1),
});

const BankPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [color, setColor] = useState("#221AFB");
  let page = searchParams.get("action");
  page = page[0].toUpperCase() + page.slice(1);
  const [id] = useState(searchParams.get("bankId") || null);

  const [defaultValues, setDefaultValues] = useState({
    name: "",
    headquarters: "",
    code: "",
    contact: "",
    dataUrl: "",
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    values: defaultValues,
  });

  const [getBank] = useGetBankMutation();
  const [createBank] = useCreateBankMutation();
  const [updateBank] = useUpdateBankMutation();

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dohnlambm");
  const [uploadPreset] = useState("gfdxvyye");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const myImage = cld.image(publicId);

  const handleBank = async (values) => {
    let credentials = {
      iconUrl: publicId,
      name: values.name,
      headquarters: values.headquarters,
      contact: values.contact,
      dataUrl: values.dataUrl,
      code: values.code,
      color: color,
    };

    if (page === "Add") {
      try {
        const response = await createBank(credentials);
        if (response.data) {
          showToast(
            `Successfully Added ${response.data.result.name}!`,
            undefined
          );
          window.location.href = process.env.NEXT_PUBLIC_ENV === "DEV" ? "http://localhost:3000/dashboard/admin" :
          "https://benchmarking-frontend.vercel.app/dashboard/admin";
        } else showToast("Error", response.error.data.message);
      } catch (err) {
        showToast("Error!", "Please try again later.");
      }
    } else if (page === "Edit") {

      try {
        const response = await updateBank({id, credentials});
        if (response.data) {
          showToast(
            `Successfully Updated Bank ${response.data.result.name} !`,
            undefined
          );
          window.location.href = process.env.NEXT_PUBLIC_ENV === "DEV" ? "http://localhost:3000/dashboard/admin" :
          "https://benchmarking-frontend.vercel.app/dashboard/admin";
        } else showToast("Error", response.error.data.message);
      } catch (err) {
        showToast("Error!", "Please try again later.");
      }
    }
  };

  const getBankData = async () => {
    try {
      const response = await getBank({ id });
      if (response.data) {
        const bankData = response.data.result;
        setColor(bankData?.color);
        setPublicId(bankData?.iconUrl);
        setDefaultValues({
          name: bankData?.name,
          headquarters: bankData?.headquarters,
          code: bankData?.code,
          contact: bankData?.contact,
          dataUrl: bankData?.dataUrl,
        });
      }
    } catch (err) {
      console.log(err);
      showToast("Error!", "Please try again later.");
    }
  };

  useEffect(() => {
    if (page === "Edit") {
      getBankData();
    }
  }, [id]);

  return (
    <div className="h-auto w-full">
      <div className="fixed top-0 flex flex-col justify-center w-full h-12 z-50 drop-shadow-lg bg-card dark:bg-card border-background">
        <div className="flex flex-row pl-5 gap-2 font-medium text-foreground">
          <FaArrowCircleLeft
            size={25}
            onClick={() => {
              router.push("/dashboard/admin");
            }}
            className="cursor-pointer mt-1"
          />
          <RxAvatar size={32} />
          <h1 className="pl-1 text-lg sm:text-2xl text-foreground dark:text-foreground">
            {page} {"Bank"}
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-end items-center w-full h-full mt-14 p-5">
        <Card className="flex flex-col justify-center items-center shadow-lg bg-card rounded-2xl border-0 h-auto w-full sm:w-1/2 md:w-[600px] p-8 sm:p-10 md:p-12 gap-10">
          <div className="flex flex-col justify-center items-center h-auto w-full gap-5">
            <div className="w-full font-bold text-center text-xl md:text-2xl">
              {page} {"Bank"}
            </div>
            {publicId ? (
              <AdvancedImage
                className="w-20 h-20 rounded-full bg-white"
                cldImg={myImage}
                plugins={[responsive(), placeholder()]}
              />
            ) : (
              <div className="flex justify-center items-center h-20 w-20 bg-foreground rounded-full">
                <RxAvatar size={40} className="text-secondary" />
              </div>
            )}

            <UploadButton
              uwConfig={uwConfig}
              setPublicId={setPublicId}
              title="Upload Bank Logo"
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleBank)}
              className="w-full flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormLabel className="mt-3 text-xs md:text-sm">
                          Enter Bank name* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Bank name"
                            type="name"
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
                name="headquarters"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormLabel className="mt-3 text-xs md:text-sm">
                          Enter Headquarters* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter headquarters"
                            type="headquarters"
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
                name="code"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormLabel className="mt-3 text-xs md:text-sm">
                          Enter Bank Code* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Bank Code"
                            type="code"
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
                name="contact"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormLabel className="mt-3 text-xs md:text-sm">
                          Enter Bank Contact* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter bank Contact"
                            type="contact"
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
                name="dataUrl"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormLabel className="mt-3 text-xs md:text-sm">
                          Enter Bank Data Url* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter bank Data Url"
                            type="dataUrl"
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
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div className="mt-3 text-xs md:text-sm">
                  Bank&apos;s Unique Colour* :
                </div>
                <HexColorPicker color={color} onChange={setColor} />
              </div>
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
        </Card>
      </div>
    </div>
  );
};

export default BankPage;

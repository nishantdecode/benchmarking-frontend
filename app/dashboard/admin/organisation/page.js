"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
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

import showToast from "@/util/showToast";
import {
  useCreateMutation,
  useDeleteOrganisationMutation,
  useGetOrganisationMutation,
  useUpdateOrganisationMutation,
} from "@/lib/features/services/organisationApi";
import UploadButton from "@/app/components/upload";

const formSchema = z.object({
  name: z.string().min(1),
  headquarter: z.string().min(1),
  contact: z.string().min(1),
});

const OrganisationPage = () => {
  let token = null;
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = searchParams.get("action");
  page = page[0].toUpperCase() + page.slice(1);
  const [id] = useState(searchParams.get("organisationId") || null);

  if (typeof window !== "undefined" && window.localStorage)
    token = localStorage.getItem("accessToken");

  const [defaultValues, setDefaultValues] = useState({
    name: "",
    headquarter: "",
    contact: "",
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    values: defaultValues,
  });

  const [getOrganisation] = useGetOrganisationMutation();
  const [createOrganisation] = useCreateMutation();
  const [updateOrganisation] = useUpdateOrganisationMutation();
  const [deleteOrganisation] = useDeleteOrganisationMutation();

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

  const handleOrganisation = async (values) => {
    let credentials = {
      picture: publicId,
      name: values.name,
      headquarter: values.headquarter,
      contact: values.contact,
    };

    if (page === "Add") {
      try {
        const response = await createOrganisation({ credentials, token });
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
        const response = await updateOrganisation({ id, token, credentials });
        if (response.data) {
          showToast(
            `Successfully Updated Organisation ${response.data.result.name} !`,
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

  const getOrganisationData = async () => {
    try {
      const response = await getOrganisation({ id, token });
      if (response.data) {
        const organisationData = response.data.result.organisation;
        setPublicId(organisationData?.picture);
        setDefaultValues({
          name: organisationData?.name,
          headquarter: organisationData?.headquarter,
          contact: organisationData?.contact,
        });
      }
    } catch (err) {
      console.log(err);
      showToast("Error!", "Please try again later.");
    }
  };

  const deleteUserData = async () => {
    try {
      const response = await deleteOrganisation({ token, id });
      if (response.data) {
        showToast(`Successfully Deleted!`, undefined);
        router.push("/dashboard/admin");
      }
    } catch (err) {
      showToast("Error!", "Please try again later.");
    }
  };

  useEffect(() => {
    if (page === "Edit") {
      getOrganisationData();
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
            {page} {"Organisation"}
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-end items-center w-full h-full mt-14 p-5">
        <Card className="flex flex-col justify-center items-center shadow-lg bg-card rounded-2xl border-0 h-auto w-full sm:w-1/2 md:w-[600px] p-8 sm:p-10 md:p-12 gap-10">
          <div className="flex flex-col justify-center items-center h-auto w-full gap-5">
            <div className="w-full font-bold text-center text-xl md:text-2xl">
              {page} {"Organisation"}
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
              title="Upload Organisation Logo"
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOrganisation)}
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
                          Enter name* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="organisation name"
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
                name="headquarter"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormLabel className="mt-3 text-xs md:text-sm">
                          Enter Headquarter* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="headquarter"
                            type="headquarter"
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
                          Enter Contact* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="organisation Contact"
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
          {searchParams.get("action") === "edit" ? (
            <div className="flex flex-row w-full justify-center md:justify-start">
              <Button
                variant="destructive"
                className="p-0 text-sm md:mt-[-80px]"
                onClick={() => {
                  deleteUserData();
                }}
              >
                <MdDelete size={24} />
                Delete Organisation
              </Button>
            </div>
          ) : (
            <></>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OrganisationPage;

"use client";

import * as z from "zod";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import { MdDelete } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa6";
import { FaArrowCircleLeft } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  useDeleteUserMutation,
  useGetUserMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} from "@/lib/features/services/authApi";
import showToast from "@/util/showToast";
import UploadButton from "@/app/components/upload";
import { useGetAllOrganisationNamesMutation } from "@/lib/features/services/organisationApi";

const roles = ["User", "Admin"];

const profiles = [
  "Bank Manager",
  "Branch Manager",
  "Accountant",
  "Regional Manager",
  "Loan Officer",
  "Credit Analyst",
  "Auditor",
  "Financial Analyst",
  "Investment Banker",
  "Trader",
];

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  profile: z.string().min(1),
});

const UserPage = () => {
  let token = null;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState("User");
  const [user, setUser] = useState(null);
  const [id] = useState(searchParams.get("userId") || null);
  const [names, setNames] = useState([]);
  const [organisation, setOrganisation] = useState(null);
  let page = searchParams.get("action");
  if (page) page = page[0].toUpperCase() + page.slice(1);

  const [defaultValues, setDefaultValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profile: "",
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    values: defaultValues,
  });

  const [getUser] = useGetUserMutation();
  const [register] = useRegisterMutation();
  const [update] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [getOrganisationNames] = useGetAllOrganisationNamesMutation();

  const userObj = useSelector((state) => state.auth.user);
  if (typeof window !== "undefined" && window.localStorage)
    token = localStorage.getItem("accessToken");

  //cloudinary for getting and uploading images
  /*start*/
  const [cloudName] = useState("dohnlambm");
  const [uploadPreset] = useState("gfdxvyye");
  const [publicId, setPublicId] = useState("");
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
  /*end*/

  const handleUser = async (values) => {
    let credentials = {
      picture: publicId,
      name: {
        first: values.firstName,
        last: values.lastName,
      },
      email: values.email,
      creatorId: user ? user.creatorId : userObj.id,
      role: { name: values.profile, type: role },
    };

    if (userObj?.role?.type === "SuperAdmin") {
      if (userObj?.id.toString() !== id?.toString()) {
        credentials.organisationId = names?.find(
          (item) => item.name === organisation
        )?.id;
      }
    } else if (userObj?.role?.type === "Admin") {
      credentials.organisationId = userObj.organisationId;
    }

    if (userObj?.id?.toString() === id?.toString()) {
      credentials.creatorId = userObj.creatorId;
      credentials.role = { name: values.profile, type: userObj.role.type };
    }

    if (page === "Add") {
      try {
        const response = await register(credentials);
        if (response.data) {
          showToast("Successful!", undefined);
          window.location.href = process.env.NEXT_PUBLIC_ENV === "DEV" ? "http://localhost:3000/dashboard/admin" :
          "https://benchmarking-frontend.vercel.app/dashboard/admin";
        } else showToast("Error", response.error.data.message);
      } catch (err) {
        showToast("Error!", "Please try again later.");
      }
    } else if (page === "Edit") {
      try {
        const response = await update({ token, id, credentials });
        if (response.data) {
          showToast(
            `Successfully Updated ${user.name.first + " " + user.name.last} !`,
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

  const getUserData = async () => {
    try {
      const response = await getUser({ token, id });
      if (response.data) {
        const userData = response.data.result.user;
        setUser(userData);
        setRole(userData.role.type || "");
        setPublicId(userData.picture);
        setDefaultValues({
          firstName: userData.name.first,
          lastName: userData.name.last,
          email: userData.email,
          profile: userData.role.name || "",
        });
      }
    } catch (err) {
      console.log(err);
      showToast("Error!", "Please try again later.");
    }
  };

  const deleteUserData = async () => {
    try {
      const response = await deleteUser({ token, id });
      if (response.data) {
        showToast(`Successfully Deleted!`, undefined);
        router.push("/dashboard/admin");
      }
    } catch (err) {
      showToast("Error!", "Please try again later.");
    }
  };

  const getOrganisationNamesData = async () => {
    try {
      const response = await getOrganisationNames({ token });
      if (response.data) {
        setNames(response.data.result.organisationNames);
      }
    } catch (err) {
      showToast("Error!", undefined);
    }
  };

  useEffect(() => {
    if (user && names.length !== 0) {
      const org = names?.find((item) => {
        item.id === user.organisationId;
      })?.name;
      setOrganisation(org || names[0].name);
    }
  }, [user, names]);

  useEffect(() => {
    if (userObj?.role?.type === "SuperAdmin") {
      getOrganisationNamesData();
    }
  }, [userObj]);

  useEffect(() => {
    if (page === "Edit") {
      getUserData();
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
            {page || ""} User
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full mt-14 p-5">
        <Card className="flex flex-col justify-center items-center shadow-lg bg-card rounded-2xl border-0 h-auto w-full sm:w-1/2 md:w-[600px] p-8 sm:p-10 md:p-12 gap-10">
          <div className="flex flex-col justify-center items-center h-auto w-full gap-5">
            <div className="w-full font-bold text-center text-xl md:text-2xl">
              {page || ""} User
            </div>
            {publicId ? (
              <AdvancedImage
                className="w-20 h-20 object-cover rounded-full bg-white"
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
              title="Upload Profile Photo"
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUser)}
              className="w-full flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormLabel className="mt-3 text-xs md:text-sm">
                          Enter First name* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            type="firstName"
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
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormLabel className="mt-3 text-xs md:text-sm">
                          Enter Last name* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            type="lastName"
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
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem
                      className={`${
                        userObj?.id.toString() === id?.toString() ? "hidden" : ""
                      }`}
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormLabel className="mt-3 text-xs md:text-sm">
                          Enter Email* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
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
              {userObj?.role?.type === "SuperAdmin" &&
                userObj?.id.toString() !== id?.toString() && (
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <div className="mt-3 text-xs md:text-sm font-medium">
                      Select Organisation* :
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="input"
                          className="flex justify-between w-full md:max-w-[300px] gap-2 rounded-md"
                        >
                          <div>{organisation || names[0]?.name}</div>
                          <FaAngleDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-60">
                        <DropdownMenuRadioGroup
                          value={organisation || names[0]?.name}
                          onValueChange={(v) => {
                            setOrganisation(v);
                          }}
                        >
                          {names.map((item, index) => {
                            return (
                              <DropdownMenuRadioItem
                                key={index}
                                value={item.name}
                                className="flex flex-row justify-start w-full px-5"
                              >
                                {item.name}
                              </DropdownMenuRadioItem>
                            );
                          })}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {userObj?.role?.type === "SuperAdmin" &&
                userObj?.id.toString() !== id?.toString() && (
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <div className="mt-3 text-xs md:text-sm font-medium">
                      Role Management* :
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="input"
                          className="flex justify-between w-full md:max-w-[300px] gap-2 rounded-md"
                        >
                          <div>{role}</div>
                          <FaAngleDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-60">
                        <DropdownMenuRadioGroup
                          value={role}
                          onValueChange={(v) => {
                            setRole(v);
                          }}
                        >
                          {roles.map((role, index) => {
                            return (
                              <DropdownMenuRadioItem
                                key={index}
                                value={role}
                                className="flex flex-row justify-start w-full px-5"
                              >
                                {role}
                              </DropdownMenuRadioItem>
                            );
                          })}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <FormLabel className="mt-3 text-xs md:text-sm font-medium">
                          User Profile* :
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter User Profile"
                            type="profile"
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
          {searchParams.get("action") === "edit" && role !== "SuperAdmin" ? (
            <div className="flex flex-row w-full justify-center md:justify-start">
              <Button
                variant="destructive"
                className="p-0 text-sm md:mt-[-80px]"
                onClick={() => {
                  deleteUserData();
                }}
              >
                <MdDelete size={24} />
                Delete User
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

export default UserPage;

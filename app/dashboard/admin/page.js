"use client";

import {
  useGetAllUsersMutation,
  useGetAllUsersOfAdminMutation,
} from "@/lib/features/services/authApi";
import { useSelector } from "react-redux";
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

import { BiEdit } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import showToast from "@/util/showToast";
import { formatDate } from "@/util/formatDateUtils";
import { SelectCategory } from "../../components/selectCategory";
import { VisualiseTable } from "@/app/components/admin/visualiseTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllOrganisationsMutation } from "@/lib/features/services/organisationApi";
import { useRequestExtractionMutation } from "@/lib/features/services/bankApi";

const Admin = () => {
  let token = null;
  const router = useRouter();
  const [dataObj, setDataObj] = useState({
    data: null,
    columnName: "",
  });
  const [category, setCategory] = useState("Users");

  const [noOfUsers, setNoOfUsers] = useState();
  const [getAllUsers] = useGetAllUsersMutation();
  const [getAllOrganisations] = useGetAllOrganisationsMutation();
  const [getAllUsersOfAdmin] = useGetAllUsersOfAdminMutation();
  const [requestExtraction] = useRequestExtractionMutation();

  if (typeof window !== "undefined" && window.localStorage)
    token = localStorage.getItem("accessToken");
  const userObj = useSelector((state) => state.auth.user) || null;
  const banks = useSelector((state) => state.bank.banks) || null;

  const [cloudName] = useState("dohnlambm");
  const [publicId, setPublicId] = useState(userObj?.picture);
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const myImage = cld.image(publicId);
  const role = userObj?.role?.type || "User";
  const formattedDate = formatDate(userObj?.createdAt);

  const getOrganisationsData = async () => {
    try {
      if (role === "SuperAdmin") {
        const response = await getAllOrganisations({ token });
        if (response.data) {
          setDataObj({
            data: response.data.result.organisations,
            columnName: "organisationColumns",
          });
        }
      }
    } catch (err) {
      showToast("Error!", "Please try again later.");
    }
  };

  const getUsers = async () => {
    try {
      if (role === "SuperAdmin") {
        const response = await getAllUsers({ token });
        if (response.data) {
          setDataObj({
            data: response.data.result.users,
            columnName: "userColumns",
          });
          setNoOfUsers(response.data.result.users.length);
        }
      } else if (role === "Admin") {
        const response = await getAllUsersOfAdmin({ token });
        if (response.data) {
          setDataObj({
            data: response.data.result.users,
            columnName: "userColumns",
          });
          setNoOfUsers(response.data.result.users.length);
        }
      }
    } catch (err) {
      console.log(err);
      showToast("Error!", "Please try again later.");
    }
  };

  useEffect(() => {
    if (userObj) {
      setPublicId(userObj.picture);
      if(userObj.role.type === "User")
      setCategory("Banks")
    }
    setDataObj({
      data: [],
      columnName: "",
    });
    if (category === "Banks") {
      setDataObj({
        data: banks,
        columnName: "bankColumns",
      });
    } else if (category === "Organisations") {
      getOrganisationsData();
    } else if (category === "Users") {
      getUsers();
    }
  }, [category, userObj]);

  return (
    <>
      <div className="flex flex-col w-full h-full mt-14 p-5 pl-7 sm:pl-10 gap-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <div className="h-[240px] sm:h-[300px] w-full sm:w-4/6">
            {userObj ? (
              <Card className="h-full w-full p-5 sm:p-14">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col items-start w-1/2 truncate">
                    <div className="rounded-full bg-foreground mb-5">
                      {publicId ? (
                        <AdvancedImage
                          className="w-20 h-20 object-cover rounded-full bg-white"
                          cldImg={myImage}
                          plugins={[responsive(), placeholder()]}
                        />
                      ) : (
                        <div className="flex justify-center items-center h-20 w-20 bg-foreground rounded-full">
                          <RxAvatar size={20} className="text-secondary" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row text-sm text-semibold">
                      <span>{`${userObj?.name?.first} ${userObj?.name?.last}`}</span>
                    </div>
                    <div className="text-medium text-sm mb-5">
                      {userObj?.email}
                    </div>
                    <div className="text-sm">Role:</div>
                    <div className="text-sm">{role}</div>
                  </div>
                  <div className="flex flex-col items-end w-1/2 truncate gap-16">
                    <div className="flex flex-row gap-2">
                      <div className="text-xs mt-0.5 sm:mt-2">Joined:</div>{" "}
                      <div className="text-sm sm:text-lg">{formattedDate}</div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(
                          `/dashboard/admin/user?action=edit&userId=${userObj.id}&entity=User`
                        )
                      }
                    >
                      <BiEdit size={15} />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Skeleton className="h-full w-full"></Skeleton>
            )}
          </div>
          <div className="flex flex-col justify-center items-center h-[200px] sm:h-[300px] w-full sm:w-2/6 gap-5">
            {banks ? (
              <Card
                className={`${
                  role === "User" ? "h-full" : "h-1/2"
                } flex flex-row justify-center items-center gap-3 w-full`}
              >
                <div className="text-lg">Total Banks: </div>
                <div className="text-3xl md:text-7xl">{banks?.length}</div>
              </Card>
            ) : (
              <Skeleton className="h-full w-full"></Skeleton>
            )}
            {role !== "User" && (
              <Card className="flex flex-row justify-center items-center gap-3 h-1/2 w-full">
                <div className="text-lg">Total Users: </div>
                <div className="text-3xl md:text-7xl">{noOfUsers}</div>
              </Card>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-5 h-auto w-full">
          {banks ? (
            <Card className="flex flex-col lg:flex-row justify-center items-start gap-5 h-auto w-full p-5 sm:p-8 sm:px-16">
              <div className="flex flex-row justify-center h-auto w-full lg:w-1/6">
                {role === "User" ? (
                  <SelectCategory
                    category={category}
                    setCategory={setCategory}
                    height={"h-[200px]"}
                    categories={[{ name: "Banks" }]}
                  />
                ) : role === "Admin" ? (
                  <SelectCategory
                    category={category}
                    setCategory={setCategory}
                    height={"h-[200px]"}
                    categories={[{ name: "Banks" }, { name: "Users" }]}
                  />
                ) : (
                  <SelectCategory
                    category={category}
                    setCategory={setCategory}
                    height={"h-200"}
                    categories={[
                      { name: "Banks" },
                      { name: "Organisations" },
                      { name: "Users" },
                    ]}
                  />
                )}
              </div>
              <div className="flex flex-col h-auto w-full lg:max-w-5/6 gap-2 sm:gap-3 md:gap-8 lg:gap-10">
                {dataObj.data && (
                  <VisualiseTable
                    data={dataObj.data}
                    columnName={dataObj.columnName}
                    role={role}
                    title={category}
                    search={true}
                  />
                )}
                {dataObj?.data?.length === 0 && (
                  <Skeleton className="h-[300px] w-full bg-transparent"></Skeleton>
                )}
              </div>
            </Card>
          ) : (
            <Skeleton className="h-[500px] w-full"/>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;

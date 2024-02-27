"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import { RxAvatar } from "react-icons/rx";
import { Card } from "@/components/ui/card";
import { BiEdit } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { SelectCategory } from "../../components/selectCategory";
import { setAuthenticated, setUser } from "@/lib/features/slices/authSlice";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bankData, userData } from "../../data/adminData";
import { MdFindInPage } from "react-icons/md";
import { useRouter } from "next/navigation";

import { useSelector, useDispatch } from "react-redux"

const Admin = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [category, setCategory] = useState("Banks");

  const [userObj, setUserObj] = useState(useSelector((state)=> state.auth)?.user || null)

  useEffect(()=>{
    if (typeof window !== "undefined" && window.localStorage) {
      if(userObj === null){
        const user = JSON.parse(localStorage.getItem("user"));
        setUserObj(user)
        dispatch(setUser(user));
        dispatch(setAuthenticated(true));
      }
    }
  },[userObj, dispatch])

  const date = new Date(userObj?.createdAt)
  const day = date.getDate();
  const month = date.getMonth() + 1; // Adding 1 because months are zero-indexed
  const year = date.getFullYear();
  const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  return (
    <>
      <div className="flex flex-col w-full h-full mt-14 p-5 pl-7 sm:pl-10 gap-10">
        <div className="flex flex-row justify-center items-center gap-5">
          <div className="h-[300px] w-4/6">
            <Card className="h-full w-full p-14">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col items-start">
                  <div className="rounded-full bg-foreground p-5 mb-5">
                    <RxAvatar className="text-background" size={20} />
                  </div>
                  <div className="text-semibold">
                    {userObj?.name?.first} {userObj?.name?.last}
                  </div>
                  <div className="text-medium text-sm mb-5">
                    {userObj?.email}
                  </div>
                  <div className="text-xs">Role:</div>
                  <div>{userObj?.role}</div>
                </div>
                <div className="flex flex-col items-end gap-14">
                  <div className="flex flex-row gap-2">
                    <div className="text-xs mt-1">Joined:</div> {formattedDate}
                  </div>
                  <Button variant="outline">
                    <BiEdit size={15} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex flex-col justify-center items-center h-[300px] w-2/6 gap-5">
            <Card className="flex flex-row justify-center items-center gap-3 h-1/2 w-full">
              <div className="text-lg">Total Banks: </div>
              <div className="text-7xl">10</div>
            </Card>
            <Card className="flex flex-row justify-center items-center gap-3 h-1/2 w-full">
              <div className="text-lg">Total Users: </div>
              <div className="text-7xl">72</div>
            </Card>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-5 h-auto w-full">
          <Card className="flex flex-row justify-center items-start gap-5 h-full w-full p-8 px-16">
            <div className="h-auto w-1/6">
              <SelectCategory
                categories={[{ name: "Banks" }, { name: "Users" }]}
                category={category}
                setCategory={setCategory}
              />
            </div>
            <div className="flex flex-col items-end gap-5 w-5/6">
            <Button size="sm" className="rounded-xl px-8 text-xs" onClick={()=>{router.push('/admin/user')}}>Add User</Button>
            <div className="h-auto w-full border rounded-md">
              {category === "Banks" ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3 text-center">
                        Bank Name
                      </TableHead>
                      <TableHead className="w-1/3 text-center">
                        Headquaters
                      </TableHead>
                      <TableHead className="w-1/3 text-center">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankData.map((item,index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="text-center font-medium bg-secondary">
                            {item["Bank Name"]}
                          </TableCell>
                          <TableCell className="text-center">
                            {item["Headquaters"]}
                          </TableCell>
                          <TableCell className="flex flex-row justify-center items-center h-12">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex flex-row gap-2 px-10 text-xs rounded-xl"
                            >
                              <MdFindInPage size={15} />
                              Request Extraction
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3 text-center">
                        User Name
                      </TableHead>
                      <TableHead className="w-1/3 text-center">
                        Email Id
                      </TableHead>
                      <TableHead className="w-1/3 text-center">
                        Role
                      </TableHead>
                      <TableHead className="w-1/3 text-center">
                        
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData.map((item,index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="text-center font-medium bg-secondary">
                            {item["User Name"]}
                          </TableCell>
                          <TableCell className="text-center">
                            {item["Email ID"]}
                          </TableCell>
                          <TableCell className="text-center">
                            {item["Role"]}
                          </TableCell>
                          <TableCell className="flex flex-row justify-center items-center h-12">
                            <Button
                              size="sm"
                              variant="link"
                              className="flex flex-row text-xs rounded-sm"
                            >
                              <BiEdit size={15} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Admin;

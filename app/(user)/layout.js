'use client'

import React from "react";
import Navbar from "@/components/navbar/navbar";
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';

const UserLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const pathname = usePathname()
  const router = useRouter()
  return (
    <div>
      <Navbar pathname={pathname} router={router} user={user}/>
      {children}
    </div>
  );
};

export default UserLayout;

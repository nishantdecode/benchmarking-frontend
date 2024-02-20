import React from "react";

import getUserAction from '@/app/actions/getUserAction'
import Navbar from "@/app/components/navbar/navbar";

const UserLayout = async ({children}) => {
  const user = await getUserAction();
  return (
    <div>
      <Navbar user={user}/>
      {children}
    </div>
  );
};

export default UserLayout;
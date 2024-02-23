import React from "react";

import Navbar from "@/app/components/navbar/navbar";

const UserLayout = async ({ children }) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
};

export default UserLayout;

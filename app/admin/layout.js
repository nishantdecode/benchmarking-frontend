import React from "react";

import Navbar from "@/app/components/navbar/navbar";

const AdminLayout = async ({children}) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
};

export default AdminLayout;
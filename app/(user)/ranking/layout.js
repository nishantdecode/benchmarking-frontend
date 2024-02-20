import React from "react";

import { FaRankingStar } from "react-icons/fa6";

import Header from "@/app/components/header/header";

const RankingLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen">
        <Header title="Rankings" icon={<FaRankingStar size={32} />} />
        {children}
      </div>
    </>
  );
};

export default RankingLayout;

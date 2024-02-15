import React from "react";

const Header = ({ title, icon }) => {
  return (
    <div className="flex flex-col justify-center w-full h-12 bg-card dark:bg-card">
      <div className="flex flex-row pl-5 font-medium text-foreground">
        {icon}
        <h1 className="pl-1 text-2xl text-foreground dark:text-foreground">{title}</h1>
      </div>
    </div>
  );
};

export default Header;

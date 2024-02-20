import React from "react";

const Header = ({ title, icon }) => {
  return (
    <div className="fixed top-0 flex flex-col justify-center w-full h-12 bg-card dark:bg-card border-background drop-shadow-lg z-50">
      <div className="flex flex-row pl-5 font-medium text-foreground">
        {icon}
        <h1 className="pl-1 text-lg sm:text-2xl text-foreground dark:text-foreground">{title}</h1>
      </div>
    </div>
  );
};

export default Header;

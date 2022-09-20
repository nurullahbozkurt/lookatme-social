import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="relative w-full">
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="w-full h-full text-gray-700 container mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;

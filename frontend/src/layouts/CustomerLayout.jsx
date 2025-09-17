import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/customer/Navbar";

function CustomerLayout() {
  return (
    <div className="h-screen flex flex-col w-full bg-gray-950 text-white">
      <Navbar/>
      <div className="p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default CustomerLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/customer/Navbar";

function CustomerLayout() {
  return (
    <div className="flex w-full bg-stone-100 h-screen">
      <Navbar/>
      <h2>customer Layout</h2>
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default CustomerLayout;

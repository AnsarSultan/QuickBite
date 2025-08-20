import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

function POSLayout() {
  return (
    <div className="flex w-full bg-stone-100 h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default POSLayout;

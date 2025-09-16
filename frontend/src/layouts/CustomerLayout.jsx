import React from "react";
import { Outlet } from "react-router-dom";

function CustomerLayout() {
  return (
    <div className="flex w-full bg-stone-100 h-screen">
      {/* <Sidebar /> */}
      <h2>customer Layout</h2>
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default CustomerLayout;

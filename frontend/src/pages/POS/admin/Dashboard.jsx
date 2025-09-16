import React from "react";
import DashboardCard from "../../../components/pos/ui/DashboardCard";

function Dashboard() {
  return (
    <div className="h-full">
      <h2 className="font-semibold text-xl">Today</h2>
      <hr className="my-2 border-gray-300" />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      <DashboardCard title="120" desciption="Total orders"/>  
      <DashboardCard title="30" desciption="Orders in Proccess"/>  
      <DashboardCard title="10" desciption="Orders to be Delivered"/>  
      <DashboardCard title="80" desciption="Completed orders"/>  
      <DashboardCard title="25" desciption="In-store pending o  rders"/>  
      <DashboardCard title="4" desciption="Online pending orders"/>  
      <DashboardCard title="2" desciption="Cancelled orders"/>  
      <DashboardCard title="18,600" desciption="Today's sales"/>  
      </div>
      <h2 className="font-semibold text-xl mt-5">This month</h2>
      <hr className="my-2 border-gray-300" />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      <DashboardCard title="2300" desciption="Completed Orders" />
      <DashboardCard title="25,0000" desciption="Sales" />
      </div>
    </div>
  );
}

export default Dashboard;

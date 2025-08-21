import React from "react";
import DashboardCard from "../../components/ui/DashboardCard";

function Dashboard() {
  return (
    <div className="h-full">
      <h2 className="font-semibold text-xl">Today</h2>
      <hr className="my-2 border-gray-300" />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      <DashboardCard title="120" desciption="Total orders"/>  
      <DashboardCard title="120" desciption="Orders in Proccess"/>  
      <DashboardCard title="120" desciption="Orders to be Delivered"/>  
      <DashboardCard title="120" desciption="Completed orders"/>  
      <DashboardCard title="120" desciption="In-store orders"/>  
      <DashboardCard title="120" desciption="Online orders"/>  
      <DashboardCard title="120" desciption="Cancelled orders"/>  
      <DashboardCard title="120" desciption="Today's sales"/>  
     
      </div>
    </div>
  );
}

export default Dashboard;

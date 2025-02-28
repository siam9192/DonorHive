import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/ui/DashboardSidebar";
import DashboardHeader from "../../components/ui/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="lg:flex h-screen overflow-hidden">
      <div className="lg:w-[10%] h-full bg-white shadow  lg:block hidden">
        <DashboardSidebar />
      </div>
      <div className="lg:w-[90%] ">
        <DashboardHeader />
        <div className="lg:p-10 p-2 h-[calc(100vh-82px)] overflow-y-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React from "react";
import ResponsiveDashboardSidebar from "./ResponsiveDashboardSidebar";

const DashboardHeader = () => {
  return (
    <div className="bg-white  px-5 lg:py-10 md:py-8 py-6 border-b-2 border-gray-500/15 ">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="md:text-2xl text-xl font-semibold text-gray-950">
            <span className="font-bold text-primary">Welcome</span>,John Doe
          </h2>
          <p className="mt-1 text-sm text-gray-700 font-medium">{new Date().toDateString()}</p>
        </div>
        <ResponsiveDashboardSidebar />
      </div>
    </div>
  );
};

export default DashboardHeader;

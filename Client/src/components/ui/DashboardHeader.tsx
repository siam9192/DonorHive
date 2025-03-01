import React from "react";
import ResponsiveDashboardSidebar from "./ResponsiveDashboardSidebar";
import { useLocation } from "react-router-dom";
import dashboardPathTitles from "../../data/dashboardPathTitles";

const DashboardHeader = () => {
  const { pathname } = useLocation();

  const pathTitle = dashboardPathTitles.find((ele) => ele.path === pathname);

  return (
    <div className="bg-white  px-5 lg:py-8 md:py-6 py-5 border-b-2 border-gray-500/15 ">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="md:text-2xl text-xl font-semibold text-gray-950">
            <span className="font-bold text-primary">Welcome</span>,John Doe
          </h2>
          <p className="mt-1 text-sm text-gray-700 font-medium">{new Date().toDateString()}</p>
          {/* {
      pathTitle &&      <h3 className=" mt-2 md:text-xl text-lg font-semibold  text-gray-700">
      {pathTitle.title}
    </h3>
     } */}
        </div>
        <ResponsiveDashboardSidebar />
      </div>
    </div>
  );
};

export default DashboardHeader;

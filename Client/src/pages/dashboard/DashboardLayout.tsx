import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/ui/DashboardSidebar";
import DashboardHeader from "../../components/ui/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex lg:h-screen lg:overflow-hidden">
      <aside className="hidden h-full w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        <DashboardSidebar />
      </aside>
      <div className="min-w-0 flex-1">
        <DashboardHeader />
        <main className="min-h-[calc(100vh-82px)] overflow-y-auto p-4 sm:p-6 lg:h-[calc(100vh-82px)] lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

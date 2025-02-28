import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import DashboardSidebar from "./DashboardSidebar";

const ResponsiveDashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-2xl p-2 bg-green-50 rounded-md text-black"
      >
        <FiMenu />
      </button>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed rotate-0  top-0 w-full h-full bg-gray-900/75  z-50  lg:hidden duration-200 ${isOpen ? "left-0" : "-left-[200%]"}`}
      >
        <div onClick={(e) => e.stopPropagation()} className="w-10/12 bg-white h-full">
          <DashboardSidebar />
        </div>
      </div>
    </>
  );
};

export default ResponsiveDashboardSidebar;

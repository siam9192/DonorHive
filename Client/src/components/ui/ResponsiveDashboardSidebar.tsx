import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import DashboardSidebar from "./DashboardSidebar";
import { useLocation } from "react-router-dom";

const ResponsiveDashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        aria-label="Open dashboard navigation"
        aria-expanded={isOpen}
        className="rounded-xl bg-emerald-50 p-2.5 text-xl text-emerald-900 transition hover:bg-emerald-100 lg:hidden"
      >
        <FiMenu />
      </button>
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 bg-slate-950/40 transition-opacity duration-200 lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`h-full w-10/12 max-w-xs bg-white shadow-2xl transition-transform duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <DashboardSidebar />
        </div>
      </div>
    </>
  );
};

export default ResponsiveDashboardSidebar;

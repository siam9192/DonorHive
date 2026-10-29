import ResponsiveDashboardSidebar from "./ResponsiveDashboardSidebar";
import { useLocation } from "react-router-dom";
import dashboardPathTitles from "../../data/dashboardPathTitles";
import NotificationBar from "./NotificationBar";
import { useCurrentUser } from "../../provider/CurrentUserProvider";

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const { user } = useCurrentUser();
  const pathTitle =
    dashboardPathTitles.find((item) => item.path === pathname) ||
    dashboardPathTitles.find(
      (item) => item.path !== "/dashboard" && pathname.startsWith(`${item.path}/`)
    );

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Welcome back, <span className="text-emerald-700">{user?.fullName || "there"}</span>
          </h1>
          {pathTitle && (
            <p className="mt-1 text-sm text-slate-500">
              {pathTitle.title}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <NotificationBar />
          <ResponsiveDashboardSidebar />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

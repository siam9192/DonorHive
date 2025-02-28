import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageCampaigns from "../pages/dashboard/ManageCampaigns";

const dashboardRoutes = [
  {
    path: "",
    element: <DashboardHome />,
  },
  {
    path: "manage-campaigns",
    element: <ManageCampaigns />,
  },
];

export default dashboardRoutes;

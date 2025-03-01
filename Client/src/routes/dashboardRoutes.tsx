import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageCampaigns from "../pages/dashboard/ManageCampaigns";
import ManageDonations from "../pages/dashboard/ManageDonations";
import ManageUsers from "../pages/dashboard/ManageUsers";

const dashboardRoutes = [
  {
    path: "",
    element: <DashboardHome />,
  },
  {
    path: "manage-campaigns",
    element: <ManageCampaigns />,
  },
  {
    path: "manage-donations",
    element: <ManageDonations />,
  },
  {
    path: "manage-users",
    element: <ManageUsers />,
  },
];

export default dashboardRoutes;

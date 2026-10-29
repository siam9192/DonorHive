import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageCampaigns from "../pages/dashboard/ManageCampaigns";
import ManageDonations from "../pages/dashboard/ManageDonations";
import ManageUsers from "../pages/dashboard/ManageUsers";
import Setting from "../pages/dashboard/Setting";
import EditProfile from "../pages/profile/EditProfile";
import PersonalInformation from "../pages/profile/PersonalInformation";

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
  {
    path: "personal-information",
    element: <PersonalInformation />,
  },
  {
    path: "edit-profile",
    element: <EditProfile />,
  },
  {
    path: "setting",
    element: <Setting />,
  },
];

export default dashboardRoutes;

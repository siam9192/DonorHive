import App from "../App";
import AboutUs from "../pages/AboutUs";
import Campaign from "../pages/Campaign";
import Campaigns from "../pages/Campaigns";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Home from "../pages/Home";
import ProfileLayout from "../pages/profile/ProfileLayout";
import dashboardRoutes from "../routes/dashboardRoutes";
import profileRoutes from "../routes/profileRoutes";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "campaigns",
        element: <Campaigns />,
      },
      {
        path: "campaigns/:slug",
        element: <Campaign />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: profileRoutes,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: dashboardRoutes,
  },
];

export default routes;

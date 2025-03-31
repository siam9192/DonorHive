import App from "../App";
import CommonLayout from "../layout/CommonLayout";
import AboutUs from "../pages/AboutUs";
import Campaign from "../pages/Campaign";
import Campaigns from "../pages/Campaigns";
import ContactUs from "../pages/ContactUs";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DonationFailed from "../pages/DonationFailed";
import DonationSuccessful from "../pages/DonationSuccessful";
import Home from "../pages/Home";
import ProfileLayout from "../pages/profile/ProfileLayout";
import ResetPassword from "../pages/ResetPassword";
import VerifyAccount from "../pages/VerifyAccount";
import PrivateRouteProvider from "../provider/PrivateRouteProvider";
import dashboardRoutes from "../routes/dashboardRoutes";
import profileRoutes from "../routes/profileRoutes";
import { EUserRole } from "../types/user.type";

const routes = [
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CommonLayout />,
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
            path: "contact-us",
            element: <ContactUs />,
          },
          {
            path: "donation-success",
            element: <DonationSuccessful />,
          },
          {
            path: "donation-failed",
            element: <DonationFailed />,
          },
          {
            path: "profile",
            element: <PrivateRouteProvider roles={[EUserRole.Donor]}>
              <ProfileLayout />
            </PrivateRouteProvider>,
            children: profileRoutes,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: dashboardRoutes,
      },
      {
        path: "/registration-verify/:token",
        element: <VerifyAccount />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

export default routes;

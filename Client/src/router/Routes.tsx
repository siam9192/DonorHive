import App from "../App";
import AboutUs from "../pages/AboutUs";
import Campaign from "../pages/Campaign";
import Campaigns from "../pages/Campaigns";
import Home from "../pages/Home";
import ProfileLayout from "../pages/profile/ProfileLayout";
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
        element:<ProfileLayout/>,
        children: profileRoutes
      },
    ],
  },
];

export default routes;

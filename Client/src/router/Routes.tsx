import App from "../App";
import Campaign from "../pages/Campaign";
import Campaigns from "../pages/Campaigns";
import Home from "../pages/Home";

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
    ],
  },
];

export default routes;

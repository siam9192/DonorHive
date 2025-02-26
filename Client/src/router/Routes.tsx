import App from "../App";
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
        path: "/campaigns",
        element: <Campaigns />,
      },
    ],
  },
];

export default routes;

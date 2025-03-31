import EditProfile from "../pages/profile/EditProfile";
import MyDonations from "../pages/profile/MyDonations";
import MyWatchList from "../pages/profile/MyWatchList";
import PersonalInformation from "../pages/profile/PersonalInformation";
import Profile from "../pages/profile/Profile";
import Setting from "../pages/profile/Setting";

const profileRoutes = [
  {
    path: "",
    element: <Profile />,
  },
  {
    path: "personal-information",
    element: <PersonalInformation />,
  },
  {
    path: "edit-personal-information",
    element: <EditProfile />,
  },
  {
    path: "my-donations",
    element: <MyDonations />,
  },
  {
    path: "watch-list",
    element: <MyWatchList />,
  },
  {
    path: "setting",
    element: <Setting />,
  },
];

export default profileRoutes;

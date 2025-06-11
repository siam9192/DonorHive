import React from "react";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdCampaign } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { HiMiniUsers, HiOutlineHome } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { useCurrentUser } from "../../provider/CurrentUserProvider";
import { logout } from "../../utils/function";

const routes = [
  {
    name: "Home",
    icon: <IoHomeOutline />,
    href: "/dashboard",
  },

  {
    name: "Campaigns",
    icon: <MdCampaign />,
    href: "/dashboard/manage-campaigns",
  },
  {
    name: "Donations",
    icon: <BiSolidDonateHeart />,
    href: "/dashboard/manage-donations",
  },
  {
    name: "Users",
    icon: <HiMiniUsers />,
    href: "/dashboard/manage-users",
  },
  {
    name: "Setting",
    icon: <IoSettingsOutline />,
    href: "/dashboard/setting",
  },
  {
    name: "Main Home",
    icon: <HiOutlineHome />,
    href: "/",
  },
];

const DashboardSidebar = () => {
  const { pathname } = useLocation();

  const { user } = useCurrentUser();
  return (
    <div className="h-full lg:px-10 lg:py-6 py-2 px-2  flex flex-col justify-between overflow-y-auto no-scrollbar ">
      <div className="">
        <h1 className="text-2xl text-gray-700 font-medium">DonorHive</h1>
        <div className=" mt-10 space-y-5">
          {routes.map((route) => (
            <Link to={route.href} key={route.name} className="block">
              <div className="flex flex-col justify-center items-center">
                <div
                  className={`text-2xl  size-fit    p-3  rounded-md  ${pathname === route.href ? "bg-primary text-white shadow-xl" : "text-primary bg-gray-100"} hover:bg-secondary `}
                >
                  {route.icon}
                </div>
                <p className="text-center mt-3 font-medium text-gray-700">{route.name}</p>
              </div>
            </Link>
          ))}

          <Link to="/dashboard/personal-information">
            <div className="p-3  rounded-md  mx-auto">
              <img
                src={
                  user?.profilePhotoUrl || "https://cdn-icons-png.flaticon.com/512/3001/3001758.png"
                }
                alt=""
                className="size-12 rounded-md mx-auto"
              />
              <h6 className=" font-medium text-gray-800 text-center mt-3">John Doe</h6>
            </div>
          </Link>
          <div
            onClick={logout}
            className="p-3 hover:cursor-pointer group  rounded-md  mx-auto text-center flex flex-col justify-center items-center  "
          >
            <p className="text-3xl  text-black group-hover:text-red-500 p-2  rounded-md">
              <TbLogout2 />
            </p>
            <p className="text-center mt-2 font-medium text-gray-700">Logout</p>
          </div>
        </div>
      </div>
      <div>
        <button></button>
      </div>
    </div>
  );
};

export default DashboardSidebar;

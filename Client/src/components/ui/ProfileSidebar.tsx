import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSolidDonateHeart } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { FaCog, FaHistory, FaUserCircle } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const ProfileSidebar = () => {
  const profileRoutes = [
    {
        name: "Profile",
        icon: <RiDashboardHorizontalLine />,
        href: "/profile",
      },
    {
        name: "Profile Information",
        icon: <FaUserCircle />,
        href: "/profile/personal-information",
      },
    {
      name: "My Donations",
      icon: <BiSolidDonateHeart />,
      href: "/profile/my-donations",
    },
    {
        name: "My Watch List",
        icon: <LuEye />,
        href: "/profile/watch-list",
      },

    {
      name: "Settings",
      icon: <FaCog />,
      href: "/profile/settings",
    },
  ];

  const {pathname} = useLocation();
   
  const [isOpen,setIsOpen] = useState(false)
  return (
   <div className="relative">
  <div className="flex items-center justify-between p-2 lg:hidden">
    <h2 className="text-xl font-medium">
      Profile Menu 
    </h2>
    <button onClick={()=>setIsOpen(!isOpen)} className="  p-2 bg-gray-50 rounded-md text-2xl  top-2  right-1 rotate-2">
    <AiOutlineMenu />
    </button>
  </div>
     <div className={`bg-white  flex flex-col justify-between lg:h-full lg:p-5 ${isOpen ? '  md:h-[800px] p-5':'h-0 overflow-hidden'} duration-200 transition-all`}>
      <div>
        <div className="flex  gap-2">
          <div className="border-2 border-gray-700/10 rounded-full h-fit ">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3001/3001758.png"
              alt=""
              className=" md:size-24 size-20 rounded-full p-2"
            />
          </div>
          <div className="py-3">
            <h1 className="md:text-2xl text-xl text-black font-medium">John Doe</h1>
            <p className="mt-1 text-gray-700 font-medium text-sm">doe78@gmail.com</p>
            <button className=" mt-3 px-6 py-2 text-gray-50 bg-primary  rounded-xl">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mt-10 ">
          {profileRoutes.map((route) => (
            <Link to={route.href} className=" group route px-3 py-5 flex  items-center gap-2 ">
              <span className="md:text-3xl text-2xl text-gray-700  p-2 bg-gray-100 rounded-md ">
                {route.icon}
              </span>
              <span className={`group-hover:text-primary md:text-xl text-lg font-medium ${pathname===route.href ? 'text-primary':'text-black'}`}>{route.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <button className="flex items-center gap-2 px-3 py-5">
        <span className="text-2xl bg-gray-100 p-2 rounded-md">
          <CiLogout />
        </span>
        <span className="text-red-500 md:text-xl text-lg font-medium">Logout</span>
      </button>
    </div>
   </div>
  );
};

export default ProfileSidebar;

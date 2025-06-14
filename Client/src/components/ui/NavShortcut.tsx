import { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CiGrid42 } from "react-icons/ci";
import { FaChevronDown, FaDonate } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../provider/CurrentUserProvider";
import { EUserRole } from "../../types/user.type";
import { logout } from "../../utils/function";

const donorRoutes = [
  {
    name: "My Profile",
    icon: ImProfile,
    href: "/profile",
  },
  {
    name: "Edit Profile",
    icon: BiEdit,
    href: "/profile",
  },
  {
    name: "My Donations",
    icon: FaDonate,
    href: "/profile/my-donations",
  },
  {
    name: "Setting",
    icon: FiSettings,
    href: "/profile/setting",
  },
];

const adminRoutes = [
  {
    name: "My Profile",
    icon: ImProfile,
    href: "/dashboard/profile",
  },
  {
    name: "Dashboard",
    icon: CiGrid42,
    href: "/dashboard",
  },
  {
    name: "Setting",
    icon: FiSettings,
    href: "/profile",
  },
];

const NavShortcut = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const { user, isLoading } = useCurrentUser();

  useEffect(() => {
    const current = ref.current;

    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!current) return;

      if (isOpen && !current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isOpen]);

  const routes = isLoading ? [] : user?.role === EUserRole.Donor ? donorRoutes : adminRoutes;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative  ">
      <div onMouseEnter={() => setIsOpen(true)} className="flex items-center gap-2">
        <img
          src={user?.profilePhotoUrl}
          alt=""
          className="md:size-12 size-9 p-1 bg-white rounded-full"
        />
        <button className="md:text-2xl text-xl text-white">
          <FaChevronDown />
        </button>
        {isOpen ? (
          <div
            onMouseLeave={() => setIsOpen(false)}
            ref={ref}
            className="absolute top-16 -right-5 w-52 min-h-60 bg-white shadow-xl p-3 rounded-md z-30 "
          >
            <div className="pb-3 border-b border-gray-200/55 flex items-center gap-1 ">
              <img
                src={user?.profilePhotoUrl}
                alt=""
                className="size-10 p-1 bg-white  rounded-full"
              />
              <h2 className="text-[1.1rem] font-medium text-gray-950">{user?.fullName}</h2>
            </div>
            <div className="mt-3 space-y-4 font-secondary">
              {routes.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                  className="  hover:text-primary w-full  font-medium  flex items-center gap-1"
                >
                  <span className="p-2 bg-gray-50 rounded-md ">
                    <item.icon />
                  </span>
                  <span>{item.name}</span>
                </Link>
              ))}
              <button
                onClick={logout}
                className="  hover:text-primary text-red-500 w-full  font-medium  flex items-center gap-1"
              >
                <span className="p-2 bg-gray-50 rounded-md ">
                  <TbLogout />
                </span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavShortcut;

import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdCampaign } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { HiMiniUsers, HiOutlineHome } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
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
  const { user } = useCurrentUser();
  return (
    <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
      <Link to="/" className="flex items-center gap-3 px-2" aria-label="DonorHive home">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-xl text-white">
          <BiSolidDonateHeart />
        </span>
        <span className="text-xl font-semibold tracking-tight text-slate-900">
          Donor<span className="text-primary">Hive</span>
        </span>
      </Link>

      <p className="mb-3 mt-10 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        Workspace
      </p>
      <nav className="space-y-1" aria-label="Dashboard navigation">
        {routes.map((route) => (
          <NavLink
            to={route.href}
            key={route.name}
            end={route.href === "/dashboard" || route.href === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <span className="text-xl">{route.icon}</span>
            {route.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-4">
        <Link
          to="/dashboard/personal-information"
          className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
        >
          <img
            src={
              user?.profilePhotoUrl ||
              "https://cdn-icons-png.flaticon.com/512/3001/3001758.png"
            }
            alt=""
            className="size-10 rounded-full bg-slate-100 object-cover"
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-slate-800">
              {user?.fullName || "Your profile"}
            </span>
            <span className="block truncate text-xs text-slate-500">
              {user?.email || "Account settings"}
            </span>
          </span>
        </Link>
        <button
          type="button"
          onClick={logout}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-700"
        >
          <TbLogout2 className="text-xl" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;

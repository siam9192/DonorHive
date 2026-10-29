import DonationStates from "../../components/sections/Dashboard/Home/DonationStates";
import DashboardSummary from "../../components/sections/Dashboard/Home/DashboardSummary";
import RecentDonations from "../../components/sections/Dashboard/Home/RecentDonations";
import RecentUsers from "../../components/sections/Dashboard/Home/RecentUsers";
import TopDonors from "../../components/sections/Dashboard/Home/TopDonors";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";

const DashboardHome = () => {
  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-800 px-5 py-6 text-white shadow-lg shadow-emerald-950/10 sm:flex-row sm:items-center sm:px-7">
        <div>
          <p className="text-sm font-medium text-emerald-100">Your community, making a difference</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            A little generosity goes a long way.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/80">
            Keep an eye on the people and causes bringing your community together.
          </p>
        </div>
        <Link
          to="/dashboard/manage-campaigns"
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50 sm:self-center"
        >
          Manage campaigns <MdArrowForward className="text-lg" />
        </Link>
      </section>
      <DashboardSummary />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <DonationStates />
        <TopDonors />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <RecentDonations />
        <RecentUsers />
      </div>
    </div>
  );
};

export default DashboardHome;

import DonationStates from "../../components/sections/Dashboard/Home/DonationStates";
import DashboardSummary from "../../components/sections/Dashboard/Home/DashboardSummary";
import RecentDonations from "../../components/sections/Dashboard/Home/RecentDonations";
import RecentUsers from "../../components/sections/Dashboard/Home/RecentUsers";
import TopDonors from "../../components/sections/Dashboard/Home/TopDonors";

const DashboardHome = () => {
  return (
    <div>
      <DashboardSummary />
      <div className=" mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
        <DonationStates />
        <TopDonors />
      </div>
      <div className=" mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
        <RecentDonations />
        <RecentUsers />
      </div>
    </div>
  );
};

export default DashboardHome;

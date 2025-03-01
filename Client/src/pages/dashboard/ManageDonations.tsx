import React from "react";
import DonationsSummary from "../../components/sections/Dashboard/ManageDonations/DonationsSummary";
import DashboardShowDonations from "../../components/sections/Dashboard/ManageDonations/DashboardShowDonations";

const ManageDonations = () => {
  return (
    <div>
      <DonationsSummary />
      <DashboardShowDonations />
    </div>
  );
};

export default ManageDonations;

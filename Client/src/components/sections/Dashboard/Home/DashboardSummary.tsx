import React from "react";
import DashboardSummaryCard from "../../../cards/DashboardSummaryCard";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdCampaign } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useGetAdminSummaryQuery } from "../../../../redux/features/overview/overview.api";
import useLoadingBounce from "../../../../hooks/useLoadingBounce";
import LoadingSummaryCard from "../../../loading-cards/LoadingSummaryCard";

const DashboardSummary = () => {
  const { data: resData, isLoading } = useGetAdminSummaryQuery(undefined);
  const summary = resData?.data;
  const data = [
    {
      title: "Donations",
      value: summary?.donationsCount || 0,
      icon: <BiSolidDonateHeart />,
    },
    {
      title: "Total Donation",
      value: summary?.totalDonationAmount || 0,
      icon: <BiSolidDonateHeart />,
      prefix: "$",
    },
    {
      title: "Campaigns",
      value: summary?.campaignsCount || 0,
      icon: <MdCampaign />,
    },
    {
      title: "Users",
      value: summary?.usersCount || 0,
      icon: <FaUsers />,
    },
  ];
  const bouncedLoading = useLoadingBounce(isLoading, 0);
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {bouncedLoading
        ? Array.from({ length: 4 }).map((_, index) => <LoadingSummaryCard key={index} />)
        : data.map((item) => <DashboardSummaryCard data={item} key={item.title} />)}
    </section>
  );
};

export default DashboardSummary;

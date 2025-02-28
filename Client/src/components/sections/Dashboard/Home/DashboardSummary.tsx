import React from "react";
import DashboardSummaryCard from "../../../cards/DashboardSummaryCard";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdCampaign } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
const data = [
  {
    title: "Donations$",
    value: 75000,
    icon: <BiSolidDonateHeart />,
  },
  {
    title: "Donation Today",
    value: 4000,
    icon: <CiCalendar />,
  },
  {
    title: "Campaigns",
    value: 24000,
    icon: <MdCampaign />,
  },
  {
    title: "Users",
    value: 56600,
    icon: <FaUsers />,
  },
];
const DashboardSummary = () => {
  return (
    <section className="grid lg:grid-cols-4  grid-cols-2 gap-5">
      {data.map((item) => (
        <DashboardSummaryCard data={item} key={item.title} />
      ))}
    </section>
  );
};

export default DashboardSummary;

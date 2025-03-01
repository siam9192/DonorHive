import React from "react";
import { CiCalendar } from "react-icons/ci";
import { FaEquals, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import DashboardSummaryCard from "../../../cards/DashboardSummaryCard";
import { LiaDonateSolid } from "react-icons/lia";
import { TbTimeDuration30 } from "react-icons/tb";

const data = [
  {
    title: "Donations",
    value: 24000,
    icon: <LiaDonateSolid />,
  },
  {
    title: "Total",
    value: 4000,
    icon: <FaEquals />,
  },
  {
    title: "Today's Total",
    value: 6600,
    icon: <CiCalendar />,
  },
  {
    title: "Last 30 Days Total",
    value: 200,
    icon: <TbTimeDuration30 />,
  },
];

const DonationsSummary = () => {
  return (
    <section className="grid lg:grid-cols-4  grid-cols-2 gap-5">
      {data.map((item) => (
        <DashboardSummaryCard data={item} key={item.title} />
      ))}
    </section>
  );
};

export default DonationsSummary;

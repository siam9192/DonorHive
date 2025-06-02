import { CiCalendar } from "react-icons/ci";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import DashboardSummaryCard from "../../../cards/DashboardSummaryCard";

const data = [
  {
    title: "Campaigns",
    value: 24000,
    icon: <MdCampaign />,
  },
  {
    title: "Running",
    value: 4000,
    icon: <CiCalendar />,
  },
  {
    title: "Completed",
    value: 6600,
    icon: <FaRegThumbsUp />,
  },
  {
    title: "Incomplete",
    value: 200,
    icon: <FaRegThumbsDown />,
  },
];

const CampaignsSummary = () => {
  return (
    <section className="grid lg:grid-cols-4  grid-cols-2 gap-5">
      {data.map((item) => (
        <DashboardSummaryCard data={item} key={item.title} />
      ))}
    </section>
  );
};

export default CampaignsSummary;

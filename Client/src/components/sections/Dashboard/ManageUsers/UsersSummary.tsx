import { FaUsers } from "react-icons/fa";
import DashboardSummaryCard from "../../../cards/DashboardSummaryCard";
import { GoBlocked } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { BsPersonCheck } from "react-icons/bs";

const data = [
  {
    title: "Total Users",
    value: 24000,
    icon: <FaUsers />,
  },
  {
    title: "Active",
    value: 4000,
    icon: <BsPersonCheck />,
  },
  {
    title: "Blocked",
    value: 6600,
    icon: <GoBlocked />,
  },
  {
    title: "Deleted",
    value: 200,
    icon: <IoTrashOutline />,
  },
];

const UsersSummary = () => {
  return (
    <section className="grid lg:grid-cols-4  grid-cols-2 gap-5">
      {data.map((item) => (
        <DashboardSummaryCard data={item} key={item.title} />
      ))}
    </section>
  );
};

export default UsersSummary;

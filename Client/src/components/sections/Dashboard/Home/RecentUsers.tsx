import { FaLongArrowAltRight } from "react-icons/fa";
import DonationManageCard from "../../../cards/DonationManageCard";
import UserCard from "../../../cards/UserCard";

const RecentUsers = () => {
  return (
    <section className=" md:p-5 p-3 bg-white border-2 border-gray-600/10 rounded-lg  flex flex-col">
      <h1 className="md:text-2xl text-xl font-semibold ">Recent Users</h1>
      <div className="min-h-[60vh] overflow-y-scroll">
        <div className="mt-5 my-4 flex-grow ">
          {Array.from({ length: 4 }).map((_, index) => (
            <UserCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentUsers;

import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import DonationManageCard from "../../../cards/DonationManageCard";

const RecentDonations = () => {
  return (
    <section className=" md:p-5 p-3 bg-white border-2 border-gray-600/10 rounded-lg ">
      <h1 className="md:text-2xl text-xl font-semibold ">Recent Donations</h1>
      <div className="mt-5 my-4 ">
        {Array.from({ length: 4 }).map((_, index) => (
          <DonationManageCard />
        ))}
      </div>
      <div className="flex justify-end">
        <button className=" flex items-center gap-1 border-b font-semibold text-amber-600 hover:text-black md:text-lg text-[0.8rem]">
          <span>View All</span>
          <span>
            <FaLongArrowAltRight />
          </span>
        </button>
      </div>
    </section>
  );
};

export default RecentDonations;

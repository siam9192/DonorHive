import React from "react";
import DonationCard from "../../cards/DonationCard";
import { FaLongArrowAltRight } from "react-icons/fa";
import ViewAllDonationsPopup from "../../ui/ViewAllDonationsPopup";

const RecentDonations = () => {
  return (
    <div className="mt-10">
      <h3 className="font-semibold text-black md:text-[1.2rem]">Recent Donations</h3>
      <div className="mt-5 my-4 ">
        {Array.from({ length: 4 }).map((_, index) => (
          <DonationCard />
        ))}
      </div>
      <div className="flex justify-end">
        <ViewAllDonationsPopup>
          <button className=" flex items-center gap-1 border-b font-semibold text-amber-600 hover:text-black md:text-lg text-[0.8rem]">
            <span>View All</span>
            <span>
              <FaLongArrowAltRight />
            </span>
          </button>
        </ViewAllDonationsPopup>
      </div>
    </div>
  );
};

export default RecentDonations;

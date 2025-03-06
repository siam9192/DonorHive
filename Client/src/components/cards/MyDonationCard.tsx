import React from "react";
import DonationDetailsPopup from "../ui/DonationDetailsPopup";
import MyDonationDetailsPopup from "../ui/MyDonationDetailsPopup";

const MyDonationCard = () => {
  return (
    <div className=" md:p-3 p-2 border-2 rounded-md border-gray-400/20 mt-3 space-y-2 relative">
      <h4 className=" font-medium text-gray-950 md:text-[1rem] text-[0.7rem]">
        Education For Everyone
      </h4>
      <p className="text-gray-700 md:text-[1rem] text-[0.6rem]">
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet voluptatum ducimus ab
        cupiditate alias."
      </p>

      <div className="flex md:flex-row flex-col md:items-center justify-between">
        <p className="font-medium text-sm text-gray-500 md:text-[1rem] text-[0.6rem]">
          {new Date().toDateString()} . 2 minutes ago
        </p>
        <div className="flex  items-center gap-2 justify-end md:text-sm text-[0.7rem]">
          <MyDonationDetailsPopup>
            <div className="text-primary font-medium">Details</div>
          </MyDonationDetailsPopup>
          <button className="text-amber-500 font-medium">Download Reciept</button>
        </div>
      </div>
      <h4 className="absolute top-2 right-2 font-semibold text-sm text-primary">$20.00</h4>
    </div>
  );
};

export default MyDonationCard;

import React from "react";

const DonationManageCard = () => {
  return (
    <div className="md:p-3 p-2 border-2 rounded-md border-gray-400/20 mt-4 space-y-2 relative">
      <h4 className=" font-medium text-gray-950 md:text-[1rem] text-[0.7rem]">John Doe</h4>
      <p className="text-gray-700 md:text-[1rem] text-[0.6rem]">
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet voluptatum ducimus ab
        cupiditate alias."
      </p>

      <p className="font-medium text-sm text-gray-500 md:text-[1rem] text-[0.6rem]">
        New York . Unites States . 2 minutes ago
      </p>

      <h4 className="absolute top-2 right-2 font-semibold text-sm text-primary">$20.00</h4>
    </div>
  );
};

export default DonationManageCard;

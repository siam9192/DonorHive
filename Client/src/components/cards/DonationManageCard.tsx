import React from "react";
import { IDonation } from "../../types/donation.type";

interface IProps {
  donation: IDonation;
}

const DonationManageCard = ({ donation }: IProps) => {
  const user = donation.user;
  const guestDonor = donation.guestDonorInfo;
  const donor = {
    name: user?.fullName || guestDonor?.fullName,
    profilePhotoUrl: user?.profilePhotoUrl || null,
    address: user?.address || guestDonor?.address,
  };

  return (
    <div className="md:p-3 p-2 border-2 rounded-md border-gray-400/20 mt-4 space-y-2 relative">
      <h4 className=" font-medium text-gray-950 md:text-[1rem] text-[0.7rem]">
        {(donation.isAnonymously ? "Anonymous Donor" : donor.name)?.toUpperCase()}
      </h4>
      <p className="text-gray-700 md:text-[1rem] text-[0.6rem]">
        {donation.comment || "No comment"}
      </p>

      <p className="font-medium text-sm text-gray-500 md:text-[1rem] text-[0.6rem]">
        {donor.address ? Object.values(donor.address).join(".") : "Address N/A"}.2 minutes ago
      </p>

      <h4 className="absolute top-2 right-2 font-semibold text-sm text-primary">
        ${donation.amount}
      </h4>
    </div>
  );
};

export default DonationManageCard;

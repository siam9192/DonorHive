import React from "react";
import { IDonation } from "../../types/donation.type";
import { getTimeAgo } from "../../utils/function";

interface IProps {
  donation: IDonation;
}

const DonationManageCard = ({ donation }: IProps) => {
  const user = donation.user;
  const guestDonor = donation.donorPersonalInfo;
  const donor = {
    name: user?.fullName || guestDonor?.fullName,
    profilePhotoUrl: user?.profilePhotoUrl || null,
    address: user?.address || guestDonor?.address,
  };

  return (
    <article className="relative rounded-xl border border-slate-100 bg-slate-50/70 p-4 pr-24">
      <h3 className="truncate text-sm font-semibold text-slate-900">
        {donation.isAnonymously ? "Anonymous donor" : donor.name || "Guest donor"}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">
        {donation.comment || "No comment"}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {getTimeAgo(donation.createdAt)} ago
      </p>

      <p className="absolute right-4 top-4 font-semibold tabular-nums text-emerald-800">
        ${donation.amount.toLocaleString()}
      </p>
    </article>
  );
};

export default DonationManageCard;

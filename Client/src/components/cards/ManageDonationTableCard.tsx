import React from "react";
import DonationDetailsPopup from "../ui/DonationDetailsPopup";
import { IDonation } from "../../types/donation.type";

interface IProps {
  donation:IDonation
}

const ManageDonationTableCard = ({donation}:IProps) => {
  return (
    <tr className="odd:bg-white  even:bg-gray-50 e border-b  border-gray-200">
      <td className="px-6 py-4 font-medium  whitespace-nowrap  text-lg text-primary">
        ${donation.amount}
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        <div className="flex items-center gap-1">
          <img
            src={donation.campaign.coverPhotoUrl}
            alt=""
            className="size-12"
          />
          <h3>{donation.campaign.title}</h3>
        </div>
      </th>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        <div className="flex items-center gap-2">
          <img src="/images/default-profile.png" alt="" className="size-10 rounded-full" />
          <h4>John Doe</h4>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-900">{donation.status.toUpperCase()}</td>
      <td className="px-6 py-4 text-gray-900">$2999</td>
      <td className="px-6 py-4 text-gray-900">$2999</td>
      <td className="px-6 py-4 space-x-4 text-gray-900">
        <DonationDetailsPopup>
          <button className="text-primary font-medium">Details</button>
        </DonationDetailsPopup>
        <button className="text-red-500 font-medium">Refund</button>
      </td>
    </tr>
  );
};

export default ManageDonationTableCard;

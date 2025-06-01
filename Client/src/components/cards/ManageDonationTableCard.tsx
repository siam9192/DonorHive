import React from "react";
import DonationDetailsPopup from "../ui/DonationDetailsPopup";
import { IDonation } from "../../types/donation.type";

interface IProps {
  donation: IDonation;
}

const ManageDonationTableCard = ({ donation }: IProps) => {
  const createdAt = new Date(donation.createdAt);
  const updatedAt = new Date(donation.updatedAt);
  const guestDonorInfo = donation.guestDonorInfo;
  const donorName = guestDonorInfo ? guestDonorInfo.fullName : donation.user?.fullName;
  const donorType = guestDonorInfo
    ? "Guest"
    : donation.isAnonymously
      ? "Anonymously"
      : "Registered";

  return (
    <tr className="odd:bg-white  even:bg-gray-50 e border-b  border-gray-200">
      <td className="px-6 py-4 font-medium  whitespace-nowrap  text-lg text-primary">
        ${donation.amount}
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        <div className="flex items-center gap-1">
          <img src={donation.campaign.coverImageUrl} alt="" className="size-12" />
          <h3>{donation.campaign.title}</h3>
        </div>
      </th>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        <div className="">
          {/* <img src="/images/default-profile.png" alt="" className="size-10 rounded-full" /> */}
          <p className="p-1 bg-green-100  rounded-full size-fit text-[0.8rem]">{donorType}</p>
          <h4 className="font-medium mt-1 ">{donorName}</h4>
          {donorType === "Registered" && <p className="text-sm">ID:{donation.user?._id}</p>}
        </div>
      </td>
      <td className="px-6 py-4 text-gray-900">{donation.status.toUpperCase()}</td>

      <td className="px-6 py-4 text-gray-900">
        {createdAt.toLocaleDateString()}-{createdAt.toLocaleTimeString()}
      </td>
      <td className="px-6 py-4 text-gray-900">
        {updatedAt.toLocaleDateString()}-{updatedAt.toLocaleTimeString()}
      </td>

      <td className="px-6 py-4 space-x-4 text-gray-900">
        <DonationDetailsPopup id={donation._id}>
          <button className="text-primary font-medium">Details</button>
        </DonationDetailsPopup>
        <button className="text-red-500 font-medium">Refund</button>
      </td>
    </tr>
  );
};

export default ManageDonationTableCard;

import React from "react";
import { FiDollarSign } from "react-icons/fi";
import { ITopDonor } from "../../types/overview.type";

interface IProps {
  donor: ITopDonor;
}

const DonorCard = ({ donor }: IProps) => {
  return (
    <div className="p-3 border-2 border-gray-400/15 rounded-md flex items-center  justify-between">
      <div className="flex items-center gap-2">
        <img src={donor.profilePhotoUrl} alt="" className="size-12 rounded-full" />
        <div>
          <h1 className="text-xl font-medium font-secondary">{donor.fullName}</h1>
          <p className="mt-1 text-primary text-sm">#{donor._id}</p>
        </div>
      </div>
      <p className="text-lg font-medium ">
        <span className="text-2xl text-black">
          <FiDollarSign className="inline" />
        </span>
        {3762}
      </p>
    </div>
  );
};

export default DonorCard;

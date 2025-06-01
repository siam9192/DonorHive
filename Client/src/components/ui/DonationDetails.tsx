import React from "react";
import { IoReturnUpBack, IoTrashOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";
import { BiHide } from "react-icons/bi";
import { useGetDonationDetailsForManageQuery } from "../../redux/features/donation/donation.api";
interface IProps {
  closePopup: () => void;
  enableManageButtons?: boolean;
  id: string;
}
const DonationDetails = ({ closePopup, enableManageButtons, id }: IProps) => {
  const { data, isLoading } = useGetDonationDetailsForManageQuery(id);

  const donation = data?.data;
  if (isLoading) return <p>Loading..</p>;
  if (!donation) return <p>Something went wrong..</p>;

  const defaultVal = "N/A";

  const createdAt = new Date(donation.createdAt);
  const updatedAt = new Date(donation.updatedAt);

  const donorInfo = {
    name: donation.user?.fullName,
  };
  return (
    <div>
      {" "}
      <h1 className="text-2xl font-medium text-gray-800">Donation Details</h1>
      <div className="mt-8">
        <div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl text-black ">
              <LuDollarSign />
            </span>

            <h1 className="text-5xl font-medium text-center text-primary ">
              120<span className="text-3xl text-gray-600">/USD</span>
            </h1>
          </div>
          <p className="mt-3 text-gray-700">
            {donation.comment ? ` "${donation.comment}"` : "No comment"}
          </p>
          <div className="mt-3 space-y-3 font-secondary">
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Id:</span>
              <span className="text-primary font-semibold">{donation._id}</span>
            </p>

            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Is Asymonyes:</span>
              <span>{donation.isAnonymously ? "Yes" : "No"}</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Created At:</span>
              <span>
                {createdAt.toLocaleDateString()}-{createdAt.toLocaleTimeString()}
              </span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Updated At:</span>
              <span>
                {updatedAt.toLocaleDateString()}-{updatedAt.toLocaleTimeString()}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-gray-900 font-medium text-xl">Campaign Information:</h2>

          <div className="mt-3 space-y-3 font-secondary">
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Campaign Id:</span>
              <span className="text-primary font-semibold">{donation.campaign.id}</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Name:</span>
              <span>{donation.campaign.title}</span>
            </p>

            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Category:</span>
              <span>{donation.campaign.category}</span>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-gray-900 font-medium text-xl">Donor Information:</h2>

          <div className="mt-3 space-y-3 font-secondary">
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">User Id:</span>
              <span className="text-primary font-semibold">{donation.userId || defaultVal}</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Full Name:</span>
              <span>John Doe</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Email Address:</span>
              <span>johndoe@mail.com</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Phone Number:</span>
              <span>+98785655</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Address:</span>
              <span>123 Belicon,New York,Bangladesh</span>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-gray-900 font-medium text-xl">Payment Information:</h2>
          <div className="mt-3 space-y-3 font-secondary">
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Transaction Id:</span>
              <span className="text-primary font-medium">{donation.payment.transactionId}</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Amount:</span>
              <span className=" text-blue-700 font-medium">{donation.payment.amount}</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Currency:</span>
              <span className="px-2 py-1 rounded-md text-purple-600  font-medium">USD</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Method:</span>
              <span className="px-2 py-1 rounded-md  bg-blue-100 text-blue-700 font-medium">
                {donation.payment.method}
              </span>
            </p>

            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Status:</span>
              <span className="text-primary font-medium">{donation.payment.status}</span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Created At:</span>
              <span>
                {new Date(donation.payment.createdAt).toDateString()}-
                {new Date(donation.payment.createdAt).toLocaleTimeString()}
              </span>
            </p>
            <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
              <span className="text-gray-950 font-semibold">Updated At:</span>
              <span>
                {new Date(donation.payment.updatedAt).toDateString()}-
                {new Date(donation.payment.updatedAt).toLocaleTimeString()}
              </span>
            </p>
          </div>
        </div>
      </div>
      {enableManageButtons && (
        <div className="mt-5 flex justify-end items-center gap-2">
          <button className=" bg-gray-100   flex items-center gap-1 p-2 font-medium text-black rounded-md">
            <span className="text-3xl text-red-700">
              <BiHide />
            </span>

            <span>Hide From viewers</span>
          </button>
          <button className=" bg-gray-100   flex items-center gap-1 p-2 font-medium text-black rounded-md">
            <span className="text-3xl text-red-700">
              <IoReturnUpBack />
            </span>

            <span>Refund</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;

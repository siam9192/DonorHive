import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface IProps {
  error: Record<string, any>;
}

const DonorDetailsForm = ({ error }: IProps) => {
  const [isDetailsFormOpen, setIsDetailsFormOpen] = useState(true);

  return (
    <div className="mt-8 ">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Your Basic Information</h3>
        <button
          type="button"
          onClick={() => setIsDetailsFormOpen((prev) => !prev)}
          className={`text-xl font-medium p-2 bg-gray-50 rounded-full ${isDetailsFormOpen ? "rotate-180" : ""} duration-100 `}
        >
          <FaChevronDown />
        </button>
      </div>

      {
        <div
          className={`mt-5  ${isDetailsFormOpen ? "max-h-[650px]" : "max-h-0"} w-full duration-200 overflow-hidden transition-all`}
        >
          <div className="  space-y-2 p-2">
            <input
              type="text"
              placeholder="Full name"
              name="guestDonorInfo.fullName"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium    outline-secondary"
            />
            {error["guestDonorInfo.fullName"] && (
              <p className="mt-1 text-red-500">{error["guestDonorInfo.fullName"]}</p>
            )}
            <input
              type="text"
              placeholder="Email Address"
              name="guestDonorInfo.email"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            {error["guestDonorInfo.email"] && (
              <p className="mt-1 text-red-500">{error["guestDonorInfo.email"]}</p>
            )}
            <input
              type="text"
              placeholder="Phone"
              name="guestDonorInfo.phoneNumber"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            {error["guestDonorInfo.phoneNumber"] && (
              <p className="mt-1 text-red-500">{error["guestDonorInfo.phoneNumber"]}</p>
            )}
            <input
              type="text"
              placeholder="Country"
              name="guestDonorInfo.address.country"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            {error["guestDonorInfo.address.country"] && (
              <p className="mt-1 text-red-500">{error["guestDonorInfo.address.country"]}</p>
            )}
            <input
              type="text"
              placeholder="State"
              name="guestDonorInfo.address.state"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            {error["guestDonorInfo.address.state"] && (
              <p className="mt-1 text-red-500">{error["guestDonorInfo.address.state"]}</p>
            )}
            <input
              type="text"
              placeholder="City"
              name="guestDonorInfo.address.city"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            {error["guestDonorInfo.address.city"] && (
              <p className="mt-1 text-red-500">{error["guestDonorInfo.address.city"]}</p>
            )}
            <input
              type="text"
              placeholder="street"
              name="guestDonorInfo.address.street"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            {error["guestDonorInfo.address.street"] && (
              <p className="mt-1 text-red-500">{error["guestDonorInfo.address.street"]}</p>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default DonorDetailsForm;

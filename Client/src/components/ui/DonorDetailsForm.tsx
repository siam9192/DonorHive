import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const DonorDetailsForm = () => {
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
            <input
              type="text"
              placeholder="Email Address"
                 name="guestDonorInfo.email"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            <input
              type="text"
              placeholder="Phone"
              name="guestDonorInfo.phoneNumber"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            <input
              type="text"
              placeholder="Country"
              name="guestDonorInfo.address.country"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            <input
              type="text"
              placeholder="State"
              name="guestDonorInfo.address.state"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
             <input
              type="text"
              placeholder="State"
              name="guestDonorInfo.address.city"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            <input
              type="text"
              placeholder="street"
              name="guestDonorInfo.address.street"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
          </div>
        </div>
      }
    </div>
  );
};

export default DonorDetailsForm;

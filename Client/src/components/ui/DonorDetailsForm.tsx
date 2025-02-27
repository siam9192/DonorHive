import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const DonorDetailsForm = () => {
  const [isDetailsFormOpen, setIsDetailsFormOpen] = useState(true);
  return (
    <div className="mt-8 ">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Your Basic Information</h3>
        <button
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
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium    outline-secondary"
            />
            <input
              type="text"
              placeholder="Email Address"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            <input
              type="text"
              placeholder="Phone"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            <input
              type="text"
              placeholder="Country"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            <input
              type="text"
              placeholder="State"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
            <input
              type="text"
              placeholder="Address"
              className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
            />
          </div>
        </div>
      }
    </div>
  );
};

export default DonorDetailsForm;

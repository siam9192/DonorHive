import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import DonorDetailsForm from "../../ui/DonorDetailsForm";

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>();
  const featuredAmounts = [20, 50, 80, 100, 150, 200, 250, 300, 350, 500];
  const [isAnonymously, setIsAnonymously] = useState(false);
  const [isAddComment, setIsAddComment] = useState(false);
  return (
    <section className="p-5  min-h-[700px] ">
      <h2 className="text-2xl font-medium text-gray-950">Secure Donation</h2>

      <div className="mt-5 grid grid-cols-3 gap-3 font-secondary">
        {featuredAmounts.map((amount) => (
          <button
            onClick={() => setSelectedAmount(amount)}
            className={`w-full py-2   border-gray-600/15 rounded-md font-medium ${selectedAmount === amount ? "border-primary border-2" : "border"}`}
          >
            ${amount}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 px-3 border-2 border-gray-700/10 rounded-lg">
        <span className="text-xl ">
          <FiDollarSign />
        </span>
        <input
          onChange={(e) =>
            !isNaN(Number(e.target.value)) &&
            setSelectedAmount(Number(parseFloat(e.target.value).toFixed(2)))
          }
          type="number"
          value={selectedAmount || ""}
          readOnly={false}
          className="w-full py-3 outline-none text-xl text-primary font-medium"
        />
        <p className="text-gray-500">USD</p>
      </div>
      <div className=" mt-8 flex items-center gap-2">
        <input
          onChange={(e) => setIsAnonymously(e.target.checked)}
          type="checkbox"
          className="size-5 accent-secondary "
        />
        <label htmlFor="" className="text-gray-600 font-medium font-secondary">
          Donate as anonymously
        </label>
      </div>

      {!isAnonymously ? <DonorDetailsForm /> : null}

      <div className="mt-10 space-y-2">
        <button
          className=" text-gray-900 border-b font-medium block"
          onClick={() => setIsAddComment((p) => !p)}
        >
          {!isAddComment ? "Add comment" : "Remove comment"}
        </button>
        {isAddComment ? (
          <textarea
            name=""
            id=""
            placeholder="Your comment"
            className=" w-full h-40 bg-gray-50  border-2 border-gray-600/10 rounded-lg resize-none p-2 outline-secondary "
          />
        ) : null}
      </div>
      <div className="mt-14">
        <button
          disabled={!selectedAmount}
          className="py-3 disabled:bg-gray-100 disabled:text-gray-600 bg-primary text-white font-semibold w-full rounded-lg font-secondary"
        >
          Donate {selectedAmount ? "$" + selectedAmount : ""}
        </button>
      </div>

      <div className=" mt-10 pt-4 border-t border-gray-700/20">
        <button className="text-sm font-medium text-gray-900 border-b ">
          Our Refund Policies:
        </button>
        <p className="mt-2 text-gray-700 font-secondary text-sm">
          Donations to our campaign are non-refundable, as they directly support our mission and
          initiatives. However, if an error occurs during payment, please contact us within 7 days
          for resolution. Refunds may be considered in exceptional cases at our discretion. Thank
          you for your generous support and understanding.
        </p>
      </div>
    </section>
  );
};

export default Donation;

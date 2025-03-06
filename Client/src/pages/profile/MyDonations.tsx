import React from "react";
import MyDonationCard from "../../components/cards/MyDonationCard";
import { IoChevronDownOutline } from "react-icons/io5";
import useLoadingBounce from "../../hooks/useLoadingBounce";

const MyDonations = () => {
  const bouncedLoading = useLoadingBounce(true, 5000);
  return (
    <div>
      <h1 className="md:text-3xl text-2xl font-semibold">My Donations</h1>
      <div className="mt-5 flex  justify-between items-center">
        <p className="text-[1rem] font-medium text-primary">20 Donations</p>
        <div className=" lg:w-1/4 md:w-1/2 w-1/2 flex  items-center justify-between  p-3 border-2 border-gray-400/40 rounded-md">
          <p className=" font-semibold text-primary">Sort By</p>
          <button className="text-2xl">
            <IoChevronDownOutline />
          </button>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5">
        {bouncedLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div className="h-40  animate-pulse bg-gray-200 rounded-md" key={index}></div>
            ))
          : Array.from({ length: 20 }).map((_, index) => <MyDonationCard key={index} />)}
      </div>
    </div>
  );
};

export default MyDonations;

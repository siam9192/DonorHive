import React from "react";
import WatchListCard from "../../components/cards/WatchListCard";

const MyWatchList = () => {
  return (
    <div>
      <h1 className="md:text-3xl text-2xl font-semibold">My WatchList</h1>
      <div className="mt-5 flex justify-between">
        <p className="text-primary font-medium font-secondary text-xl">0 Campaigns</p>
        <select
          name=""
          id=""
          className="md:w-1/3 w-1/2 px-2 py-3 border-2 border-gray-700/20 outline-secondary rounded-md"
        >
          <option value="">Sortby (Default)</option>
          {Array.from({ length: 10 }).map((_, index) => (
            <option>Option {index + 1}</option>
          ))}
        </select>
      </div>
      <div className="mt-10 grid  grid-cols-1 md:gap-5 gap-3">
        {/* {Array.from({ length: 4 }).map((_, index) => (
          <WatchListCard key={index} />
        ))} */}
        <h1>
          Not Available Now
        </h1>
      </div>
    </div>
  );
};

export default MyWatchList;

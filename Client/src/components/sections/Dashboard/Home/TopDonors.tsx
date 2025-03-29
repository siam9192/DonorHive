import React from "react";
import ChartBar from "../../../ui/ChartBar";
import DonorCard from "../../../cards/DonorCard";
import { useGetTopDonorsQuery } from "../../../../redux/features/overview/overview.api";
import useLoadingBounce from "../../../../hooks/useLoadingBounce";

const TopDonors = () => {
  const { data, isLoading } = useGetTopDonorsQuery(undefined);
  const donors = data?.data;
  const bouncedLoading = useLoadingBounce(isLoading);

  return (
    <section className=" md:p-5 p-3  border-2 border-gray-600/10 rounded-lg ">
      <h1 className="md:text-2xl text-xl font-semibold ">Top Donors</h1>
      <div className="mt-8 space-y-2   h-[35vh] overflow-y-auto  customize-scrollbar">
        {bouncedLoading
          ? Array.from({ length: 5 }).map(() => (
              <div className="h-32 bg-gray-200 animate-pulse"></div>
            ))
          : donors?.map((donor) => <DonorCard donor={donor} key={donor._id} />)}
      </div>
    </section>
  );
};

export default TopDonors;

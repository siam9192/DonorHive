import React from "react";
import ChartBar from "../../../ui/ChartBar";
import DonorCard from "../../../cards/DonorCard";

const TopDonors = () => {
  const data = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    data.unshift({
      total: Math.floor(Math.random() * (3000000 - 1000000) + 1000000),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    });
    currentDate.setMonth(currentDate.getMonth() - 1);
  }
  const maxTotal = Math.max(...data.map((item) => item.total));
  const max = maxTotal + (5 / 100) * maxTotal;
  return (
    <section className=" md:p-5 p-3  border-2 border-gray-600/10 rounded-lg ">
      <h1 className="md:text-2xl text-xl font-semibold ">Top Donors</h1>
      <div className="mt-10 grid grid-cols-1 gap-5   h-[35vh] overflow-y-auto  customize-scrollbar">
        {Array.from({ length: 5 }).map(() => (
          <DonorCard />
        ))}
      </div>
    </section>
  );
};

export default TopDonors;

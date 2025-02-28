import React, { ReactNode } from "react";
import CountUp from "react-countup";

interface IProps {
  data: {
    title: string;
    value: string | number;
    icon: ReactNode;
  };
}

const DashboardSummaryCard = ({ data }: IProps) => {
  return (
    <div className="md:p-5 p-3 space-y-3  border-2 rounded-md border-gray-600/15 relative">
      <div className="p-2 w-fit bg-gray-100 rounded-md  text-2xl md:hidden">{data.icon}</div>
      <h6 className="font-medium text-gray-600 md:text-[1rem] text-sm">{data.title}</h6>
      <h1 className="lg:text-4xl md:text-3xl text-2xl text-center font-semibold ">
        {typeof data.value === "number" ? (
          <CountUp start={0} end={data.value} duration={2} />
        ) : (
          data.value
        )}
      </h1>
      <div className="p-2 bg-gray-100 rounded-md  absolute right-1 top-1 md:text-4xl text-2xl md:block hidden">
        {data.icon}
      </div>
    </div>
  );
};

export default DashboardSummaryCard;

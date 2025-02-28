import React, { useState } from "react";
import { monthNames } from "../../utils/constant";

interface IProps {
  data: {
    total: number;
    month: number;
    year: number;
  };
  max: number;
}

const ChartBar = ({ data, max }: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const getPercentage = (value: number, max: number) => {
    return (value / max) * 100;
  };

  return (
    <div className="h-full flex flex-col justify-center items-center relative">
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="w-fit group  bg-green-100 rounded-full  h-full flex flex-col justify-end"
      >
        <div
          className="md:w-4 w-2  group-hover:bg-secondary hover:cursor-pointer  bg-green-400 rounded-full custom-barchart-bar"
          style={{ height: `${getPercentage(data.total, max)}%` }}
        />
      </div>
      <p className=" font-medium text-gray-200 md:text-[1rem] text-[0.7rem]">
        {monthNames[data.month - 1].slice(0, 3)} {data.year.toString().slice(2, 4)}
      </p>

      {isHover && (
        <div className={`md:p-5 p-2   bg-white absolute -top-5 left-0  rounded-md  z-30`}>
          <h4 className="md:text-lg text-sm font-medium font-secondary">
            {monthNames[data.month - 1]}
          </h4>
          <h3 className="md:text-xl text-lg text-primary font-medium">{data.total}</h3>
        </div>
      )}
    </div>
  );
};

export default ChartBar;

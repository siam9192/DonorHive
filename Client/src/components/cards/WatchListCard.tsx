import React from "react";
import UseScreen from "../../hooks/UseScreen";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const WatchListCard = () => {
  const { screenType } = UseScreen();
  let description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quae at vel culpa. Eius
  ullam nulla distinctio architecto laboriosam numquam molestiae sunt aut,`;

  const showLength = screenType === "lg" ? 150 : screenType === "md" ? 90 : 60;
  const shortDescription = description.slice(0, showLength);
  return (
    <div className="flex gap-5 relative ">
      <img
        src="https://plus.unsplash.com/premium_photo-1682092585257-58d1c813d9b4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9vciUyMGNoaWxkfGVufDB8fDB8fHww"
        alt=""
        className="w-[40%] h-40 rounded-md"
      />
      <div>
        <div className=" font-medium text-end md:text-[1rem] md:text-sm text-[0.5rem]">
          20 days left
        </div>
        <h1 className="md:text-xl text-lg text-gray-900 font-semibold">Food is for Everyone</h1>
        <p className="text-gray-700 font-secondary">{shortDescription}</p>
        <div className=" md:mt-8 mt-6 space-y-1 relative">
          <div className="absolute -top-6 left-[80%] px-2 py-1 bg-secondary text-gray-900 text-[0.5rem] font-medium ">
            80%
          </div>
          <div className="bg-gray-100 rounded-full">
            <div className="w-[80%] h-1 bg-green-700 rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-950 md:block hidden">
              Raised: <span className="text-amber-500 font-medium">$129</span>
            </p>
            <p className="text-gray-950 md:text-lg text-sm">
              Goal: <span className="text-amber-500 font-medium">$129</span>
            </p>
          </div>
        </div>
      </div>
      <button className="p-2 size-fit bg-primary hover:bg-secondary text-white absolute inset-0">
        <MdOutlineRemoveRedEye />
      </button>
    </div>
  );
};

export default WatchListCard;



const CampaignCard = () => {
  return (
    <div className="bg-white">
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/1739842/pexels-photo-1739842.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
          className="rounded-md"
        />
        {/* <div className="absolute w-full bottom-1  flex items-center justify-end gap-1  px-1">
          <div className=" p-2 bg-secondary text-gray-900 font-medium text-sm">2H</div>
          <div className=" p-2 bg-secondary text-gray-900 font-medium text-sm">12M</div>
          <div className="p-2 bg-secondary text-gray-900 font-medium text-sm">43S</div>
        </div> */}
      </div>
      <div className="mt-4 space-y-1">
        <div className=" font-medium text-end md:text-[1rem] text-sm">20 days left</div>
        <p className="text-yellow-600 font-medium text-[0.8rem]">Education</p>
        <h2 className="md:text-xl text-[1rem] text-gray-950 font-medium">Education is for everyone</h2>
        <p className="text-gray-800 font-secondary text-[0.9rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quae at vel culpa. Eius
          ullam nulla distinctio architecto laboriosam numquam molestiae sunt aut,{" "}
        </p>
      </div>
      <div className="mt-3 space-y-1 relative">
        <div className="absolute -top-8 left-[80%] px-2 py-1 bg-secondary text-gray-900 text-[0.7rem] font-medium">
          80%
        </div>
        <div className="bg-gray-100 rounded-full">
          <div className="w-[80%] h-1 bg-green-700 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-950">
            Raised: <span className="text-amber-500 font-medium">$129</span>
          </p>
          <p className="text-gray-950">
            Goal: <span className="text-amber-500 font-medium">$129</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;

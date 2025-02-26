

const ActivityCard = () => {
  return (
    <div className="md:flex gap-3  hover:border-b-4 p-2  border-primary shadow">
      <img src="/images/banner.jpg" alt="" className="md:w-[40%] md:h-full" />
      <div className="p-3 md:space-y-3 space-y-2">
        <h1 className="text-gray-950 font-medium md:text-[1.1rem] text-[0.8rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, dolore?
        </h1>
        <p className="font-secondary  text-gray-700 md:text-[0.9rem] text-[0.6rem]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut aspernatur voluptatibus
          explicabo magni doloremque accusamus. Itaque sint tempora accusamus eaque?
        </p>

        <button className="text-green-400 font-medium md:text-[1rem] text-[0.8rem]">
          View Story
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;

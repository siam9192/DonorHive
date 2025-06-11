interface IProps {
  activity: {
    id: string;
    title: string;
    description: string;
    coverPhotoUrl: string;
  };
}
const ActivityCard = ({ activity }: IProps) => {
  return (
    <div className="md:flex gap-3  hover:border-b-4 p-2  border-primary shadow">
      <img src={activity.coverPhotoUrl} alt="" className="md:w-[40%] md:h-full object-cover" />
      <div className="p-3 md:space-y-3 space-y-2">
        <h1 className="text-gray-950 font-medium md:text-[1.1rem] text-[0.8rem]">
          {activity.title}
        </h1>
        <p className="font-secondary  text-gray-700 md:text-[0.9rem] text-[0.6rem]">
          {activity.description}
        </p>

        <button className="text-green-400 font-medium md:text-[1rem] text-[0.8rem]">
          View Story
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;

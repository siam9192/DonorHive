import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IWatchListItem } from "../../types/watch-list-item.type";
import useRemainingDaysCounter from "../../hooks/useRemainingDaysCounter";
import { Link } from "react-router-dom";
import { useDeleteWatchListItemMutation } from "../../redux/features/watch-list-item/watch-list-item.api";
import { toast } from "sonner";

interface IProps {
  item: IWatchListItem;
  onRemove?: (id: string) => void;
}
const WatchListCard = ({ item, onRemove }: IProps) => {
  const campaign = item.campaign;
  const progressPercentage = Math.round((campaign.raisedAmount / campaign.targetAmount) * 100);
  const timeLeft = useRemainingDaysCounter(campaign.endAt);
  const [removeFromWatchList] = useDeleteWatchListItemMutation();

  async function handelRemoveFromWatchList() {
    try {
      const response = await removeFromWatchList(campaign._id);
      if (!response.data?.success) {
        throw new Error("Something went wrong");
      }
      onRemove && onRemove(campaign._id);
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <div className="flex gap-5 relative ">
      <img src={campaign.coverImageUrl} alt="" className="w-[40%] h-40 rounded-md" />
      <Link to={`/campaigns/${campaign.slug}`}>
        <div>
          <div className=" font-medium md:text-end md:text-[1rem] md:text-sm text-[0.8rem]">
            <span>Ends in</span>
            <span className="text-primary">
              {" "}
              {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes{" "}
              {timeLeft.seconds}{" "}
            </span>
          </div>
          <h1 className="md:text-xl text-lg text-gray-900 font-semibold">{campaign.title}</h1>
          <p className="text-gray-700 font-secondary">{campaign.description}</p>
          <div className=" md:mt-8 mt-6 space-y-1 relative">
            <div
              style={{ left: `${progressPercentage}%` }}
              className="absolute -top-6  px-2 py-1 bg-secondary text-gray-900 text-[0.5rem] font-medium "
            >
              {progressPercentage}%
            </div>
            <div className="bg-gray-100 rounded-full">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="h-1 bg-green-700 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-950 md:block hidden">
                Raised: <span className="text-amber-500 font-medium">${campaign.raisedAmount}</span>
              </p>
              <p className="text-gray-950 md:text-lg text-sm">
                Goal: <span className="text-amber-500 font-medium">${campaign.targetAmount}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={handelRemoveFromWatchList}
        className="p-2 size-fit bg-primary hover:bg-secondary text-white absolute inset-0"
      >
        <MdOutlineRemoveRedEye />
      </button>
    </div>
  );
};

export default WatchListCard;

import { Link } from "react-router-dom";
import UseScreen from "../../hooks/UseScreen";
import { ICampaign } from "../../types/campaign.type";
import { getTimeLeft } from "../../utils/function";

interface IProps {
  campaign: ICampaign;
}

const CampaignCard = ({ campaign }: IProps) => {
  const { screenType } = UseScreen();
  let description = campaign.description;

  const showLength = screenType === "lg" ? 150 : screenType === "md" ? 90 : 60;
  const shortDescription = description.slice(0, showLength);

  const progressPercentage = Math.round((campaign.raisedAmount / campaign.targetAmount) * 100);
  return (
    <Link to={`/campaigns/${campaign.slug}`}>
      <div className="bg-white">
        <div className="relative">
          <img src={campaign.coverImageUrl} alt="" className="rounded-md h-72 w-full" />
          {/* <div className="absolute w-full bottom-1  flex items-center justify-end gap-1  px-1">
          <div className=" p-2 bg-secondary text-gray-900 font-medium text-sm">2H</div>
          <div className=" p-2 bg-secondary text-gray-900 font-medium text-sm">12M</div>
          <div className="p-2 bg-secondary text-gray-900 font-medium text-sm">43S</div>
        </div> */}
        </div>
        <div className="md:mt-4 mt-3 space-y-1">
          <div className=" font-medium text-end md:text-[1rem] md:text-sm text-[0.5rem]">
            {getTimeLeft(campaign.endAt)}
          </div>
          <p className="text-yellow-600 font-medium text-[0.8rem]">{campaign.category}</p>
          <h2 className="md:text-xl text-[1rem] text-gray-950 font-medium">{campaign.title}</h2>
          <p className="text-gray-800 font-secondary text-[0.9rem]">
            {shortDescription}
            {description.length !== shortDescription.length ? "..." : null}
          </p>
        </div>
        <div className=" md:mt-8 mt-6 space-y-1 relative">
          <div
            className="absolute -top-6  px-2 py-1 bg-secondary text-gray-900 text-[0.5rem] font-medium "
            style={{ left: `${progressPercentage}%` }}
          >
            {progressPercentage}%
          </div>
          <div className="bg-gray-100 rounded-full">
            <div
              className="h-1 bg-green-700 rounded-full"
              style={{ width: `${progressPercentage}%` }}
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
  );
};

export default CampaignCard;

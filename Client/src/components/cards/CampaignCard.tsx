import { Link } from "react-router-dom";
import { ICampaign } from "../../types/campaign.type";
import { getTimeLeft } from "../../utils/function";
import useRemainingDaysCounter from "../../hooks/useRemainingDaysCounter";

interface IProps {
  campaign: ICampaign;
}

const CampaignCard = ({ campaign }: IProps) => {
  const progressPercentage = Math.min(
    100,
    Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)
  );

  const timeLeft = useRemainingDaysCounter(campaign.endAt);

  return (
    <Link to={`/campaigns/${campaign.slug}`} className="group h-full">
      <div className="bg-white  border-gray-200 hover:border-secondary transition-all duration-300 h-full flex flex-col rounded-xl overflow-hidden">

        {/* IMAGE SECTION */}
        <div className="relative overflow-hidden">
          <img
            src={campaign.coverImageUrl}
            alt={campaign.title}
            className="h-60  md:80 lg:h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Countdown */}
          <div className="absolute bottom-2 right-2 flex gap-1 text-xs font-semibold">
            {["days", "hours", "minutes", "seconds"].map((unit, i) => (
              <div
                key={i}
                className="bg-secondary text-gray-900 px-2 py-1 rounded-md"
              >
                {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, "0")}
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col flex-grow space-y-2">

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="text-yellow-600 font-medium">
              {campaign.category}
            </span>
            <span>{getTimeLeft(campaign.endAt)}</span>
          </div>

          <h2 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-secondary transition-colors">
            {campaign.title}
          </h2>

          <p className="text-sm text-gray-600 line-clamp-2">
            {campaign.description}
          </p>

          {/* PROGRESS SECTION */}
          <div className="mt-auto pt-4 space-y-2">

            {/* Percentage */}
            <div className="flex justify-between text-xs font-medium">
              <span className="text-amber-500">
                {progressPercentage}%
              </span>
              <span className="text-gray-700">
                ${campaign.raisedAmount} raised
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-700">
              <span>Goal</span>
              <span className="font-semibold text-gray-900">
                ${campaign.targetAmount}
              </span>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;

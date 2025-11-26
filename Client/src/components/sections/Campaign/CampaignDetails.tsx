import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { ICampaign, IVisitCampaign } from "../../../types/campaign.type";
import RecentDonations from "./RecentDonations";
import { FiEye } from "react-icons/fi";
import { toast } from "sonner";
import { useState } from "react";
import {
  useCreateWatchListItemMutation,
  useDeleteWatchListItemMutation,
} from "../../../redux/features/watch-list-item/watch-list-item.api";
import { useCurrentUser } from "../../../provider/CurrentUserProvider";

interface IProps {
  campaign: IVisitCampaign;
}

const CampaignDetails = ({ campaign }: IProps) => {
  const { user } = useCurrentUser();
  const [isWatchListed, setIsWatchListed] = useState(campaign.isWatchListed);
  const progressPercentage = Math.round((campaign.raisedAmount / campaign.targetAmount) * 100);

  function shareContent() {
    if (navigator.share) {
      navigator
        .share({
          title: `${campaign.title}`,
          text: `Donate here to support "${campaign.title}" and make a difference.`,
          url: window.location.href, // or a specific campaign URL
        })
        .then(() => console.log("Thanks for sharing!"))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      alert("Sharing is not supported in this browser.");
    }
  }

  const [addToWatchList] = useCreateWatchListItemMutation();
  const [removeFromWatchList] = useDeleteWatchListItemMutation();
  async function toggleWatchList() {
    if (!user) {
      return toast.info("Please login first");
    }
    const prev = isWatchListed;
    const toggle = !isWatchListed;

    let data;

    if (toggle === true) {
      const response = await addToWatchList({
        campaignId: campaign._id,
      });

      data = response.data;
    } else {
      const response = await removeFromWatchList(campaign._id);

      data = response.data;
    }
    if (!data?.success) {
      throw new Error("Something went wrong");
    }

    setIsWatchListed((p) => !p);
    try {
      toast.success(
        toggle === true ? "Watch listed  successfully" : "Unwatch listed successfully",
        {
          position: "top-right",
        },
      );
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
      });
      setIsWatchListed(prev);
    }
  }

  return (
    <section>
      <div className="md:space-y-8 space-y-6">
        <div className="flex items-center justify-between gap-2">
          <div>
            <button
              onClick={toggleWatchList}
              className={`p-2 ${isWatchListed ? "bg-primary text-white" : "bg-gray-200"} rounded-lg`}
            >
              <FiEye size={28} />
            </button>
          </div>
          <div className="flex items-center  gap-2">
            <p className="text-gray-700">Share :</p>
            <button
              onClick={shareContent}
              className=" md:text-2xl text-xl p-2 bg-gray-50 rounded-full"
            >
              <FaFacebook />
            </button>
            <button onClick={shareContent} className="text-2xl p-2 bg-gray-50 rounded-full">
              <FaInstagram />
            </button>
            <button onClick={shareContent} className="text-2xl p-2 bg-gray-50 rounded-full">
              <FaTwitter />
            </button>
          </div>
        </div>
        <h1 className="md:text-5xl text-3xl  font-secondary font-bold text-gray-950">
          {campaign.title}
        </h1>
        <div className="space-y-2">
          <div className="bg-green-50 rounded-full">
            <div
              className=" md:h-2 h-1 bg-primary rounded-full "
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between font-secondary">
            <p className="text-sm text-gray-700 font-medium">
              <span className="font-semibold text-black text-[1rem]">${campaign.raisedAmount}</span>{" "}
              raised
            </p>
            <p className="text-sm text-gray-600 font-semibold">${campaign.targetAmount}</p>
          </div>
        </div>
        <img src={campaign.coverImageUrl} alt="" className="rounded-lg w-full" />
        <p className="text-gray-800 font-secondary md:text-[1rem] text-[0.9rem]">
          {campaign.description}
        </p>
        <div className="flex items-center flex-wrap gap-3 md:text-[1rem] text-sm">
          <Link to="" className=" font-medium text-gray-700 border-b hover:text-primary">
            Other Ways to give
          </Link>
          <Link to="" className=" font-medium text-gray-700 border-b hover:text-primary">
            Support
          </Link>
          <Link to="" className=" font-medium text-gray-700 border-b hover:text-primary">
            Call-in donations
          </Link>
        </div>
      </div>
      <RecentDonations id={campaign._id} />
    </section>
  );
};

export default CampaignDetails;

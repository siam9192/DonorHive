import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { ICampaign } from "../../../types/campaign.type";
import RecentDonations from "./RecentDonations";
import { FiEye } from "react-icons/fi";
import { toast } from "sonner";

interface IProps {
  campaign: ICampaign;
}

const CampaignDetails = ({ campaign }: IProps) => {
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

function toggleWatchList () {
  toast.success("This added to your watch list",{
    position:'top-right'
  })
}

  return (
    <section>
      <div className="md:space-y-8 space-y-6">
        <div className="flex items-center justify-between gap-2">
          <div>
            <button onClick={toggleWatchList} className="p-2 bg-gray-200 rounded-lg">
              <FiEye size={28}/>
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

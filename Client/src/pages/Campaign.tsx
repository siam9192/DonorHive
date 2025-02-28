import { BiSolidDonateHeart } from "react-icons/bi";
import Container from "../components/container/Container";
import CampaignDetails from "../components/sections/Campaign/CampaignDetails";
import CampaignHeader from "../components/sections/Campaign/CampaignHeader";
import Donation from "../components/sections/Campaign/Donation";
import DonationPopup from "../components/ui/DonationPopup";
import RelatedCampaigns from "../components/sections/Campaign/RelatedCampaigns";

const Campaign = () => {
  return (
    <div>
      <CampaignHeader />
      <Container>
        <div className=" py-10 lg:grid grid-cols-6 gap-10">
          <div className="col-span-4">
            <CampaignDetails />
          </div>
          <div className="col-span-2 lg:block hidden">
            <Donation />
          </div>
        </div>
      </Container>
      <RelatedCampaigns />
      {/* Donation form pop up only for md and sm screen  */}
      <div className="  fixed bottom-10 right-4 lg:hidden">
        <DonationPopup>
          <div className="text-2xl lg:hidden p-3  rounded-full  bg-primary text-white">
            <BiSolidDonateHeart />
          </div>
        </DonationPopup>
      </div>
    </div>
  );
};

export default Campaign;

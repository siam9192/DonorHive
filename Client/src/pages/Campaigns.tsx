import ShowCampaigns from "../components/sections/Campaigns/ShowCampaigns";
import CampaignFilterBox from "../components/sections/Campaigns/CampaignFilterBox";
import CampaignsHeader from "../components/sections/Campaigns/CampaignsHeader";

const Campaigns = () => {
  return (
    <div>
      <CampaignsHeader />
      <CampaignFilterBox />
      <ShowCampaigns />
    </div>
  );
};

export default Campaigns;

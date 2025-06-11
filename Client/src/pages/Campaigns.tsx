import ShowCampaigns from "../components/sections/Campaigns/ShowCampaigns";
import CampaignFilterBox from "../components/sections/Campaigns/CampaignFilterBox";
import CampaignsHeader from "../components/sections/Campaigns/CampaignsHeader";
import { Helmet } from "react-helmet";

const Campaigns = () => {
  return (
    <div>
      <Helmet title="Campaigns | DonorHive" />
      <CampaignsHeader />
      <CampaignFilterBox />
      <ShowCampaigns />
    </div>
  );
};

export default Campaigns;

import Container from "../components/container/Container";
import CampaignDetails from "../components/sections/Campaign/CampaignDetails";
import CampaignHeader from "../components/sections/Campaign/CampaignHeader";
import Donation from "../components/sections/Campaign/Donation";

const Campaign = () => {
  return (
    <div>
      <CampaignHeader />
      <Container>
        <div className=" py-10 lg:grid grid-cols-6 gap-10">
          <div className="col-span-4">
            <CampaignDetails />
          </div>
          <div className="col-span-2">
            <Donation />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Campaign;

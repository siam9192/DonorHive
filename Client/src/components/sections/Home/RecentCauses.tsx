import useLoadingBounce from "../../../hooks/useLoadingBounce";
import { useGetRecentCampaignsQuery } from "../../../redux/features/campaign/campaign.api";
import CampaignCard from "../../cards/CampaignCard";
import Container from "../../container/Container";
import CampaignLoadingCard from "../../loading-cards/CampaignLoadingCard";
import Heading from "../../ui/Heading";
const headingProps = {
  heading: "Recent Causes",
  title: "Our recent campaigns,Donate in this campaign and help us to progress",
};

const RecentCauses = () => {
  const { data, isLoading } = useGetRecentCampaignsQuery(undefined);
  const campaigns = data?.data;
  const bouncedLoading = useLoadingBounce(isLoading);
  return (
    <section className="py-10">
      <Container>
        <Heading {...headingProps} />
        <div className="mt-10 grid lg:grid-cols-3 grid-cols-2  md:gap-6 gap-3">
          {bouncedLoading
            ? Array.from({ length: 3 }).map((_, index) => <CampaignLoadingCard key={index} />)
            : campaigns?.map((campaign, index) => (
                <CampaignCard campaign={campaign} key={campaign._id} />
              ))}
        </div>
      </Container>
    </section>
  );
};

export default RecentCauses;

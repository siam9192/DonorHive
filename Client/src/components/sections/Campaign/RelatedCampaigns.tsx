import Container from "../../container/Container";
import CampaignCard from "../../cards/CampaignCard";
import { useGetRelatedCampaignsQuery } from "../../../redux/features/campaign/campaign.api";
import { useParams } from "react-router-dom";
import useLoadingBounce from "../../../hooks/useLoadingBounce";
import CampaignLoadingCard from "../../loading-cards/CampaignLoadingCard";

const RelatedCampaigns = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetRelatedCampaignsQuery(slug as string);
  const campaigns = data?.data;
  const bouncedLoading = useLoadingBounce(isLoading);
  return (
    <section className="py-10">
      <Container>
        <h1 className="md:text-4xl text-2xl text-black font-semibold">
          Similar <span className="text-primary">Campaigns</span>
        </h1>
        <div className="mt-10 grid lg:grid-cols-3 grid-cols-2  md:gap-6 gap-3">
          {bouncedLoading
            ? Array.from({ length: 5 }).map((_, index) => <CampaignLoadingCard key={index} />)
            : campaigns?.map((campaign, index) => (
                <CampaignCard campaign={campaign} key={campaign._id} />
              ))}
        </div>
      </Container>
    </section>
  );
};

export default RelatedCampaigns;

import { BiSolidDonateHeart } from "react-icons/bi";
import Container from "../components/container/Container";
import CampaignDetails from "../components/sections/Campaign/CampaignDetails";
import CampaignHeader from "../components/sections/Campaign/CampaignHeader";
import Donation from "../components/sections/Campaign/Donation";
import DonationPopup from "../components/ui/DonationPopup";
import RelatedCampaigns from "../components/sections/Campaign/RelatedCampaigns";
import { useParams } from "react-router-dom";
import { useGetCampaignForVisitQuery } from "../redux/features/campaign/campaign.api";
import useLoadingBounce from "../hooks/useLoadingBounce";
import { useEffect } from "react";

const Campaign = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetCampaignForVisitQuery(slug as string);
  const campaign = data?.data;

  const bouncedLoading = useLoadingBounce(isLoading, 500);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!isLoading && (isError || !campaign)) {
    throw new Error("Something went wrong");
  }
  if (bouncedLoading) return <div className="h-screen">Loading...</div>;
  return (
    <div>
      <CampaignHeader />
      <Container>
        <div className=" py-10 lg:grid grid-cols-6 gap-10">
          <div className="col-span-4">
            <CampaignDetails campaign={campaign!} />
          </div>
          <div className="col-span-2 lg:block hidden">
            <Donation campaign={campaign!} />
          </div>
        </div>
      </Container>
      <RelatedCampaigns />
      {/* Donation form pop up only for md and sm screen  */}
      <div className="  fixed bottom-10 right-4 lg:hidden">
        <DonationPopup campaign={campaign!}>
          <div className="text-2xl lg:hidden p-3  rounded-full  bg-primary text-white">
            <BiSolidDonateHeart />
          </div>
        </DonationPopup>
      </div>
    </div>
  );
};

export default Campaign;

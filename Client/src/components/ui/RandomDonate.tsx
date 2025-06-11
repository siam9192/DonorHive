import React from "react";
import { Link } from "react-router-dom";
import { useGetRandomCampaignQuery } from "../../redux/features/campaign/campaign.api";

function RandomDonate() {
  const { data } = useGetRandomCampaignQuery(undefined);
  const campaign = data?.data;
  return (
    <Link to={campaign ? `/campaigns/${campaign.slug}` : "/campaigns"}>
      <button className=" md:block hidden uppercase px-6 py-3 text-gray-900 hover:bg-gray-900 hover:text-white bg-secondary  font-medium">
        Donate Now
      </button>
    </Link>
  );
}

export default RandomDonate;

import React from "react";
import Container from "../../container/Container";
import CampaignCard from "../../cards/CampaignCard";

const RelatedCampaigns = () => {
  return (
    <section className="py-10">
      <Container>
        <h1 className="md:text-4xl text-2xl text-black font-semibold">
          Similar <span className="text-primary">Campaigns</span>
        </h1>
        <div className="mt-10 grid lg:grid-cols-3 grid-cols-2  md:gap-5 gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <CampaignCard key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RelatedCampaigns;

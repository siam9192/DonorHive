import React from "react";
import Container from "../../container/Container";

const CampaignHeader = () => {
  return (
    <section className="campaign-header  relative">
      <Container className="flex flex-col gap-4 justify-center items-center h-full">
        <h1 className="lg:text-5xl md:text-4xl text-3xl  font-bold text-white font-secondary md:p-5 p-4 bg-primary ">
          Campaign
        </h1>
    
      </Container>
    </section>
  );
};

export default CampaignHeader;

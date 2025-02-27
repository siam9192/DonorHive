import React from "react";
import Container from "../../container/Container";

const CampaignsHeader = () => {
  return (
    <section className="campaigns-header  relative">
      <Container className="flex flex-col gap-4 justify-center items-center h-full">
        <h1 className="lg:text-5xl md:text-4xl text-3xl  font-bold text-white font-secondary md:p-5 p-4 bg-primary ">
          Our Campaigns
        </h1>
        <p className="md:p-4 p-3 size-fit bg-secondary text-black   absolute inset-0">
          Home/Campaigns
        </p>
      </Container>
    </section>
  );
};

export default CampaignsHeader;

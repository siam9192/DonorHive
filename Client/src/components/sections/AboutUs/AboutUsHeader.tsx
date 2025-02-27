import React from "react";
import Container from "../../container/Container";

const AboutUsHeader = () => {
  return (
    <section className="lg:h-60 md:h-40 h-32 bg-green-50">
      <Container className="flex justify-center items-center text-center h-full">
        <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold">About Us</h1>
      </Container>
    </section>
  );
};

export default AboutUsHeader;

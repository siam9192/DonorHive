import React from "react";
import Container from "../../container/Container";

const ContactUsHeader = () => {
  return (
    <section className="py-20 bg-green-50">
      <Container className="flex justify-center items-center flex-col">
        <h1 className="md:text-5xl text-4xl text-center font-semibold">Contact Us</h1>
      </Container>
    </section>
  );
};

export default ContactUsHeader;

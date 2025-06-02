import React from "react";
import Container from "../../container/Container";

const AboutActions = () => {
  return (
    <section className="py-10 p-2">
      <Container className="py-20  bg-primary flex flex-col justify-center gap-5 items-center rounded-2xl">
        <h1 className="md:text-3xl text-2xl text-white font-semibold text-center">
          Join Us And Lets's Make A Better World,Today
        </h1>
        <p className="text-center font-secondary text-gray-100">
          Be a part of something greater. Together, we can create lasting change and build a
          brighter, more compassionate world — starting now.
        </p>
        <div className="mt-10 flex md:flex-row flex-col items-center gap-2">
          <button className=" md:w-fit w-full px-8 py-3 bg-secondary text-gray-950 rounded-full font-medium">
            Donate Now
          </button>
          <button className=" md:w-fit w-full px-8 py-3 bg-white text-gray-950 rounded-full font-medium">
            More ways to help
          </button>
        </div>
      </Container>
    </section>
  );
};

export default AboutActions;

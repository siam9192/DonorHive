import React from "react";
import Container from "../../container/Container";
import CountUp from "react-countup";
import { IoPlay } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import VideoPopup from "../../ui/VideoPopup";

const Activities = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <section className="py-10 bg-[#F9F9F9]">
      <Container>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          <div className="px-10 relative md:block hidden">
            <img
              src="https://st2.depositphotos.com/2801443/5683/i/450/depositphotos_56835989-stock-photo-indian-kids-in-the-jaisalmer.jpg"
              alt=""
              className="h-full w-full"
            />
            <div className="absolute inset-0 flex justify-center items-center bg-transparent">
              <VideoPopup>
                <div className="size-fit p-2 animate-pulse rounded-full bg-gray-50/30 backdrop-blur-sm ">
                  <button className="p-4 rounded-full flex justify-center items-center bg-white text-primary    text-center text-4xl">
                    <IoPlay />
                  </button>
                </div>
              </VideoPopup>
            </div>
          </div>
          <div ref={ref} className="md:px-10 p-5 py-5 space-y-8">
            <h1 className="text-4xl text-black font-semibold">
              When people <span className="text-primary">help people</span> <br /> change happens
            </h1>
            <p className="text-gray-700">
              When people come together to support and uplift one another, real change happens.
              Whether through simple acts of kindness, mentorship, or community-driven initiatives,
              helping others creates a ripple effect that fosters growth, resilience, and
              transformation. Every effort, no matter how small, has the potential to inspire and
              empower someone in need. By offering a helping hand, we not only improve individual
              lives but also strengthen communities and build a more compassionate world. True
              change begins when people choose to care, connect, and contribute, proving that
              together, we can make a lasting difference in the lives of others.
            </p>
            {inView ? (
              <div className="flex md:flex-row flex-col md:gap-0 gap-3 md:items-center    md:justify-between">
                <div className="text-center">
                  <h1 className="md:text-5xl text-4xl text-primary font-bold">
                    <CountUp end={12} duration={2} />
                  </h1>
                  <p className=" font-secondary text-gray-500 md:text-[0.8rem]">
                    Years Of Experience
                  </p>
                </div>
                <div className="text-center">
                  <h1 className="md:text-5xl text-4xl text-primary font-bold">
                    {" "}
                    <CountUp end={45} duration={2} />K
                  </h1>
                  <p className=" font-secondary text-gray-500">Active volunteer</p>
                </div>
                <div className="text-center">
                  <h1 className="md:text-5xl text-4xl text-primary font-bold">
                    {" "}
                    <CountUp end={120} duration={2} />+
                  </h1>
                  <p className=" font-secondary text-gray-500">Complete Project</p>
                </div>
              </div>
            ) : null}
            <button className="py-3 px-6 bg-primary hover:bg-gray-900 text-white">
              Explore More
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Activities;

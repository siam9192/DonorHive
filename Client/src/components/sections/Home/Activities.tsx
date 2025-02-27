import React from "react";
import Container from "../../container/Container";
import CountUp from "react-countup";
import { IoPlay } from "react-icons/io5";
import { useInView } from "react-intersection-observer";

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
              <div className="size-fit p-2 animate-pulse rounded-full bg-gray-50/30 backdrop-blur-sm ">
                <button className="p-4 rounded-full flex justify-center items-center bg-white text-primary    text-center text-4xl">
                  <IoPlay />
                </button>
              </div>
            </div>
          </div>
          <div ref={ref} className="md:px-10 p-5 py-5 space-y-8">
            <h1 className="text-4xl text-black font-semibold">
              When people <span className="text-primary">help people</span> <br /> change happens
            </h1>
            <p className="text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, sunt neque! Odio
              rem voluptas veritatis esse mollitia fugiat doloribus, recusandae quos architecto
              earum aut velit asperiores accusantium soluta provident autem vitae maxime, ipsum
              libero enim hic quod sequi. Modi praesentium natus distinctio, excepturi sunt error
              iusto consequatur quibusdam ipsa tenetur dolore ducimus hic quidem fugit veritatis
              rerum architecto. Est, iste?
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

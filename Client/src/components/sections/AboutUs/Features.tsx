import React from "react";
import Container from "../../container/Container";
import { BiSolidDonateHeart, BiSupport } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa";

const Features = () => {
  return (
    <section className="md:py-10 py-8">
      <Container>
        <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-10 gap-8">
          {/* Gallery */}
          <div className=" lg:order-1 order-2 grid grid-cols-2 md:gap-5 gap-2">
            <div>
              <img
                className="aspect-square rounded-xl"
                src="https://img77.uenicdn.com/image/upload/v1664676953/business/4474842a500142418b6deb57e5057022.jpg"
                alt=""
              />
            </div>
            <div className="space-y-5">
              <img
                className="rounded-xl"
                src="https://uschamber-co.imgix.net/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fco-assets%2Fassets%2Fimages%2Fshould-business-donate-to-charity.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.5403&fp-y=0.3164&h=415&q=88&w=622&s=fbe08b938df0d15059cb046b51f07841"
                alt=""
              />
              <div className="p-5 shadow-md rounded-md ">
                <div className="flex justify-between items-center">
                  <h4 className="text-black font-semibold font-secondary md:text-sm text-[0.7rem]">
                    Complete Projects
                  </h4>
                  <h4 className="text-primary font-semibold md:text-sm text-[0.7rem]">30%</h4>
                </div>
                <div className="mt-2  w-[80%] bg-primary h-2 rounded-full"></div>
              </div>
            </div>
            <div className="col-span-2">
              <img
                className="w-full  aspect-video rounded-xl"
                src="https://res.cloudinary.com/zenbusiness/q_auto,w_1200/v1/shared-assets/s2/raster/man-carrying-box-with-stuffed-bunny.jpg"
                alt=""
              />
            </div>
          </div>

          {/* Featured */}

          <div className=" lg:order-2 order-1 md:p-10  space-y-5">
            <div className="space-y-3">
              <h6 className=" font-medium text-amber-600">Features</h6>
              <h1 className="md:text-3xl text-2xl text-gray-950 font-semibold">
                Donate To People In Our Featured
              </h1>
              <p className="text-gray-700 md:text-[1rem] text-sm font-secondary">
                Meet the individuals and causes that need your help the most. Your donation can
                bring hope and change to lives featured in our spotlight.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="md:text-2xl text-xl p-3 bg-amber-100  text-amber-600 rounded-full">
                  <BiSupport />
                </span>
                <p className="font-semibold md:text-lg text-[1rem]">24/7 Support</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl p-3 bg-green-100  text-green-600 rounded-full">
                  <BiSolidDonateHeart />
                </span>
                <p className="font-semibold text-lg">Make Donation</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl p-3 bg-amber-100  text-amber-600 rounded-full">
                  <FaUserShield />
                </span>
                <p className="font-semibold text-lg">Success Rate</p>
              </div>
              <button className="md:px-6 md:py-3 px-4 py-2 bg-primary text-white font-medium  rounded-full">
                Read More
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Features;

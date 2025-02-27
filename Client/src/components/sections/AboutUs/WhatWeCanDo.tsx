import React from "react";
import Container from "../../container/Container";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const WhatWeCanDo = () => {
  const list = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, vero?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, vero?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, vero?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, vero?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, vero?",
  ];
  return (
    <section className="md:py-10 py-8">
      <Container className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        {/* Col-1 */}
        <div className=" order-1 md:p-10  space-y-5">
          <div className="space-y-3">
            <h6 className=" font-medium text-amber-600">What we can Do</h6>
            <h1 className="md:text-3xl text-2xl text-gray-950 font-semibold">
              We Make A Difference In Their Life
            </h1>
            <p className="text-gray-700 md:text-[1rem] text-sm font-secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores laudantium natus
              veritatis id repudiandae magni tenetur voluptas ipsum neque aliquam?
            </p>
          </div>
          <div className="space-y-2">
            {list.map((item, index) => (
              <div key={index} className="flex items-center gap-2 ">
                <span className="p-2 text-sm bg-secondary text-gray-950 ">
                  <FaCheck />
                </span>
                <p className="text-gray-700 font-secondary md:text-[1rem] text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Col-2 */}
        <div className=" order-2 grid grid-cols-2 md:gap-5 gap-3">
          <div className="bg-green-100 flex flex-col gap-2 justify-center items-center h-fit p-10 rounded-2xl  text-center ">
            <h1 className="text-3xl font-semibold text-primary">150 K</h1>
            <p className="text-gray-800 font-medium md:text-[1rem] text-sm">Human Impacted</p>
          </div>
          <div className="bg-amber-100 mt-5 flex flex-col gap-2 justify-center items-center h-fit p-10 rounded-2xl  text-center ">
            <h1 className="text-3xl font-semibold text-yellow-600">180 K</h1>
            <p className="text-gray-800 font-medium md:text-[1rem] text-sm">Donations</p>
          </div>
          <div className="bg-amber-100 flex flex-col gap-2 justify-center items-center h-fit p-10 rounded-2xl  text-center ">
            <h1 className="text-3xl font-semibold text-yellow-600">50 K</h1>
            <p className="text-gray-800 font-medium md:text-[1rem] text-sm">Collaborators</p>
          </div>
          <div className="bg-green-100 mt-5 flex flex-col gap-2 justify-center items-center h-fit p-10 rounded-2xl  text-center ">
            <h1 className="text-3xl font-semibold text-primary">82</h1>
            <p className="text-gray-800 font-medium md:text-[1rem] text-sm">Assisted communities</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhatWeCanDo;

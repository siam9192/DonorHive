import React from "react";
import { Helmet } from "react-helmet";
import { MdSmsFailed } from "react-icons/md";

const DonationFailed = () => {
  return (
    <>
      <Helmet title="Failed | DonorHive" />
      <div className="h-[85vh] flex flex-col gap-2 justify-center items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/004/968/453/non_2x/failed-to-make-payment-by-credit-card-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg"
          alt=""
          className="h-1/2 mx-auto"
        />
        <div className="flex items-center gap-2">
          <span className="text-3xl font-medium   text-red-500 p-3  rounded-full">
            <MdSmsFailed />
          </span>
          <h1 className="text-3xl font-semibold font-secondary">Donation Failed</h1>
        </div>
        <p>Payment failed try again. Lorem ipsum dolor sit amet consectetur.</p>
        <div className="flex items-center gap-2">
          <button className="px-6 py-3  border-2 rounded-md hover:bg-secondary">Back Home</button>
          <button className="px-6 py-3  border-2 rounded-md hover:bg-secondary">Go back</button>
        </div>
      </div>
    </>
  );
};

export default DonationFailed;

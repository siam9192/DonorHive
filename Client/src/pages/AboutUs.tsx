import React from "react";
import AboutUsHeader from "../components/sections/AboutUs/AboutUsHeader";
import Features from "../components/sections/AboutUs/Features";
import WhatWeCanDo from "../components/sections/AboutUs/WhatWeCanDo";
import AboutActions from "../components/sections/AboutUs/AboutActions";

const AboutUs = () => {
  return (
    <div>
      <AboutUsHeader />
      <Features />
      <WhatWeCanDo />
      <AboutActions />
    </div>
  );
};

export default AboutUs;

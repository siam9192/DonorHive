import Activities from "../components/sections/Home/Activities";
import AlmostReacheded from "../components/sections/Home/AlmostReacheded";
import ExploreActivities from "../components/sections/Home/ExploreActivities";
import GetInvolved from "../components/sections/Home/GetInvolved";
import Hero from "../components/sections/Home/Hero";
import HowItWorks from "../components/sections/Home/HowItWorks";
import RecentCauses from "../components/sections/Home/RecentCauses";
import SuccessGallery from "../components/sections/Home/SuccessGallery";

const Home = () => {
  return (
    <>
      <div className="space-y-10 overflow-x-hidden">
        <Hero />
        <RecentCauses />
        <HowItWorks />
        <AlmostReacheded />
        <Activities />
        <ExploreActivities />
        <SuccessGallery />
        <GetInvolved />
      </div>
    </>
  );
};

export default Home;

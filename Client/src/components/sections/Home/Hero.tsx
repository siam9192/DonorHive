import { FaPlayCircle } from "react-icons/fa";
import "../../../styles/Hero.css";
import Container from "../../container/Container";
import HeroSearchForm from "../../forms/HeroSearchForm";
import VideoPopup from "../../ui/VideoPopup";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="hero lg:min-h-[100vh] min-h-[90vh]">
      <Container>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 ">
          <div className="md:space-y-5 space-y-10 md:py-32 py-10">
            <h1 className=" lg:text-8xl md:text-7xl text-5xl text-white font-medium">
              Habitat for <span className="text-primary font-bold">Humanity</span> Donations
            </h1>
            <p className="text-gray-200 text-[0.9rem] font-secondary md:block hidden">
              Habitat for Humanity accepts donations to help build affordable housing for families
              in need. Contributions can be monetary, building materials, or gently used household
              items through Habitat ReStores. Donations support local and global housing projects,
              creating safe and stable homes.
            </p>
            <div className="flex items-center gap-3">
              <VideoPopup>
                <button className=" text-primary lg:text-[70px] md:text-[60px] text-[40px] animate-pulse border-4 border-secondary rounded-full p-2">
                  <FaPlayCircle />
                </button>
              </VideoPopup>
              <h2 className="text-gray-300 md:text-3xl text-2xl font-medium font-secondary">
                Watching Video
              </h2>
            </div>
            <div className="absolute bottom-0 left-0 w-full  px-2 lg:hidden">
              <Link to={"/campaigns"} className="block  mt-2">
                <button className="w-full py-3 font-medium bg-secondary text-gray-950 float-right  lg:hidden">
                  Donate Now
                </button>
              </Link>
              <button className="w-full py-3 font-medium bg-primary text-gray-950 float-right  lg:hidden mt-2">
                Become a volunteer
              </button>
            </div>
          </div>
          <div className="md:px-10 md:py-20  py-5 px-5 lg:block hidden">
            <HeroSearchForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;

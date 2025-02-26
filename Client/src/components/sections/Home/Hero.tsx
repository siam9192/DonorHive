import { FaPlayCircle } from "react-icons/fa";
import "../../../styles/Hero.css";
import Container from "../../container/Container";
import HeroSearchForm from "../../forms/HeroSearchForm";
const Hero = () => {
  return (
    <div className="hero lg:min-h-[100vh] h-[90vh]">
      <Container>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 ">
          <div className="space-y-5 md:py-32 py-10">
            <h1 className=" lg:text-8xl md:text-7xl text-6xl text-white font-medium">
              Habitat for <span className="text-primary font-bold">Humanity</span> Donations
            </h1>
            <p className="text-gray-200 text-[0.9rem] font-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam suscipit doloribus
              rerum reprehenderit, eaque dolorem illo! Odit consequatur pariatur maxime nulla
              magnam? Nesciunt atque ipsam fugit tempore debitis qui nisi aperiam. Soluta ea
              doloribus ullam reiciendis facilis exercitationem explicabo. Rem!
            </p>
            <div className="flex items-center gap-3">
              <button className=" text-primary lg:text-[70px] md:text-[60px] text-[50px] animate-pulse border-4 border-secondary rounded-full p-2">
                <FaPlayCircle />
              </button>
              <h2 className="text-gray-300 text-3xl font-medium font-secondary">Watching Video</h2>
            </div>
            <div className="absolute bottom-0 left-0 w-full space-y-2 px-2 lg:hidden">
              <button className="w-full py-3 font-medium bg-secondary text-gray-950 float-right  lg:hidden">
                Donate Now
              </button>
              <button className="w-full py-3 font-medium bg-primary text-gray-950 float-right  lg:hidden">
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

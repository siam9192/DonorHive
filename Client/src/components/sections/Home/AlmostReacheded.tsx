import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import CampaignCard from "../../cards/CampaignCard";
import Container from "../../container/Container";
import Heading from "../../ui/Heading";
import { CSSProperties, useEffect, useState } from "react";

const headingProps = {
  heading: "Almost Reacheded",
  title:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi possimus perspiciatis, iste repudiandae laboriosam non quae repellat.",
};

const AlmostReacheded = () => {
  const [current, setCurrent] = useState(0);
  const [screenType, setScreenType] = useState("lg");

  // 	40rem (640px)	@media (width >= 40rem) { ... }
  // md	48rem (768px)	@media (width >= 48rem) { ... }
  // lg	64rem (1024px)	@media (width >= 64rem) { ... }
  // xl	80rem (1280px)	@media (width >= 80rem) { ... }
  // 2xl	96rem (1536px)
  useEffect(() => {
    const innerWidth = window.innerWidth;
    if (innerWidth > 768) {
      setScreenType("lg");
    } else if (innerWidth < 768 && innerWidth > 640) {
      setScreenType("md");
    } else setScreenType("sm");
  }, [window.innerWidth]);

  const total = 9;
  const limit = screenType === "lg" ? 3 : screenType === "md" ? 2 : 1;

  const getCardStyle = (index: number): CSSProperties => {
    return {
      width: `${100 / limit}%`,
      left: `${index * (100 / limit)}%`,
      transform: `translateX(-${100 * current}%)`,
    };
  };

  const handelChangeCurrent = (type: "p" | "n") => {
    if (type === "n") {
      setCurrent((prev) => (prev + 1 < total ? prev + 1 : 0));
    } else {
      setCurrent((prev) => (prev - 1 >= 0 ? prev - 1 : total - 1));
    }
  };

 
  return (
    <section className="py-10 ">
      <Container>
        <Heading {...headingProps} />
        <div className="mt-5 text-end">
          <button
            disabled={current === 0}
            onClick={() => handelChangeCurrent("p")}
            className="px-6 py-3 text-2xl bg-secondary text-gray-900 hover:bg-gray-900 hover:text-white disabled:bg-gray-100 disabled:text-black"
          >
            <MdOutlineArrowBackIosNew />
          </button>
          <button
            disabled={current + 1 === total}
            onClick={() => handelChangeCurrent("n")}
            className="px-6 py-3 text-2xl bg-secondary text-gray-900 hover:bg-gray-900 hover:text-white disabled:bg-gray-100 disabled:text-black"
          >
            <MdOutlineArrowForwardIos />
          </button>
        </div>
        <div className="mt-10 flex   relative h-[60vh]  overflow-hidden ">
          {Array.from({ length: total }).map((_, index) => (
            <div
              className="absolute  p-2  transition-all duration-500 ease-in-out"
              style={getCardStyle(index)}
            >
              <CampaignCard key={index} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AlmostReacheded;

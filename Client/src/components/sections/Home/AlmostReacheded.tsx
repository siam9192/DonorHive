import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import CampaignCard from "../../cards/CampaignCard";
import Container from "../../container/Container";
import Heading from "../../ui/Heading";
import { CSSProperties, useEffect, useState } from "react";
import UseScreen, { EScreenType } from "../../../hooks/UseScreen";
import { useGetAlmostCompletedCampaignsQuery } from "../../../redux/features/campaign/campaign.api";
import useLoadingBounce from "../../../hooks/useLoadingBounce";
import CampaignLoadingCard from "../../loading-cards/CampaignLoadingCard";

const headingProps = {
  heading: "Almost Reacheded",
  title:
    "These campaigns are just steps away from reaching their goals. Lend your support and help make a lasting impact!",
};

const AlmostReacheded = () => {
  const [current, setCurrent] = useState(0);

  const { screenType } = UseScreen();

  const { data, isLoading } = useGetAlmostCompletedCampaignsQuery(undefined);
  const campaigns = data?.data;
  const bouncedLoading = useLoadingBounce(isLoading);
  const total = bouncedLoading ? 3 : campaigns?.length || 0;
  const limit = screenType === EScreenType.SM ? 1 : screenType === "md" ? 2 : 3;

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
            disabled={bouncedLoading || current === 0}
            onClick={() => handelChangeCurrent("p")}
            className="px-6 py-3 text-2xl bg-secondary text-gray-900 hover:bg-gray-900 hover:text-white disabled:bg-gray-100 disabled:text-black"
          >
            <MdOutlineArrowBackIosNew />
          </button>
          <button
            disabled={bouncedLoading || current + 1 === total}
            onClick={() => handelChangeCurrent("n")}
            className="px-6 py-3 text-2xl bg-secondary text-gray-900 hover:bg-gray-900 hover:text-white disabled:bg-gray-100 disabled:text-black"
          >
            <MdOutlineArrowForwardIos />
          </button>
        </div>
        <div className="mt-10 flex   relative h-[500px] overflow-hidden ">
          {bouncedLoading
            ? Array.from({ length: total }).map((_, index) => (
                <div
                key={index}
                  className="absolute  p-2  transition-all duration-500 ease-in-out"
                  style={getCardStyle(index)}
                >
                  <CampaignLoadingCard />
                </div>
              ))
            : campaigns?.map((campaign, index) => (
                <div
                  className="absolute  p-2  transition-all duration-500 ease-in-out h-full"
                  style={getCardStyle(index)}
                >
                  <CampaignCard campaign={campaign} key={campaign._id} />
                </div>
              ))}
        </div>
      </Container>
    </section>
  );
};

export default AlmostReacheded;

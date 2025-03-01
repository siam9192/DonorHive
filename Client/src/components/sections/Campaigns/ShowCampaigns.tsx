import React from "react";
import Container from "../../container/Container";
import CampaignCard from "../../cards/CampaignCard";
import Pagination from "../../pagination/Pagination";
import { Link } from "react-router-dom";
import CampaignLoadingCard from "../../loading-card/CampaignLoadingCard";
import useLoadingBounce from "../../../hooks/useLoadingBounce";

const ShowCampaigns = () => {
  const popularSearchers = ["Food", "House", "Education", "Children"];
  const bouncedLoading = useLoadingBounce(true,5000)
  
  return (
    <section className="md:py-10 py-6">
      <Container>
        <div className="flex justify-center md:flex-row flex-col items-center gap-4 my-4">
          <p>Popular Search:</p>
          <div className="flex items-center flex-wrap gap-2">
            {popularSearchers.map((item) => (
              <Link to="" key={item} className="text-secondary font-medium hover:text-primary">
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="md:text-xl text-[1rem] font-semibold text-primary">20 Campaigns Found</p>
          <select
            name=""
            id=""
            className="px-4 py-2 border-2 border-secondary outline-none rounded-md"
          >
            <option value="">Sort By</option>
            {Array.from({ length: 10 }).map((_, index) => (
              <option>Category-1{index + 1}</option>
            ))}
          </select>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 grid-cols-2  md:gap-5 gap-3">
          {
            bouncedLoading ? Array.from({ length: 14 }).map((_, index) => (
              <CampaignLoadingCard key={index}/>
             ))
             :
             Array.from({ length: 14 }).map((_, index) => (
              <CampaignCard key={index}/>
             ))
          }
        </div>

        <div className="mt-10 flex justify-center items-center">
          <Pagination total={50} limit={10} page={3} onPageChange={() => {}} />
        </div>
      </Container>
    </section>
  );
};

export default ShowCampaigns;

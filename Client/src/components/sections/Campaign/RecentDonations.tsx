import React from "react";
import DonationCard from "../../cards/DonationCard";
import { FaLongArrowAltRight } from "react-icons/fa";
import ViewAllDonationsPopup from "../../ui/ViewAllDonationsPopup";
import { useGetCampaignLatestDonationsQuery } from "../../../redux/features/donation/donation.api";
import useLoadingBounce from "../../../hooks/useLoadingBounce";
import DonationLoadingCard from "../../loading-cards/DonationLoadingCard";

interface IProps {
  id: string;
}

const RecentDonations = ({ id }: IProps) => {
  const { data, isLoading } = useGetCampaignLatestDonationsQuery(id);
  const donations = data?.data;
  const bouncedLoading = useLoadingBounce(isLoading);

  return (
    <div className="mt-10">
      <h3 className="font-semibold text-black md:text-[1.2rem]">Recent Donations</h3>
      <div className="mt-5 my-4 ">
        {bouncedLoading ? (
          Array.from({ length: 6 }).map((_, index) => <DonationLoadingCard key={index} />)
        ) : donations?.length ? (
          donations?.map((donation) => <DonationCard donation={donation} key={donation._id} />)
        ) : (
          <div className="h-40 flex justify-center items-center">
            <h1 className="text-xl">No recent donations</h1>
          </div>
        )}
      </div>
      {donations?.length && !bouncedLoading ? (
        <div className="flex justify-end">
          <ViewAllDonationsPopup id={id}>
            <div className=" flex items-center gap-1 border-b font-semibold text-amber-600 hover:text-black md:text-lg text-[0.8rem]">
              <span>View All</span>
              <span>
                <FaLongArrowAltRight />
              </span>
            </div>
          </ViewAllDonationsPopup>
        </div>
      ) : null}
    </div>
  );
};

export default RecentDonations;

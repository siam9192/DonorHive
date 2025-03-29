import { FaLongArrowAltRight } from "react-icons/fa";
import DonationManageCard from "../../../cards/DonationManageCard";
import { useGetRecentDonationsQuery } from "../../../../redux/features/donation/donation.api";
import useLoadingBounce from "../../../../hooks/useLoadingBounce";
import Donation from "../../Campaign/Donation";
import DonationLoadingCard from "../../../loading-cards/DonationLoadingCard";

const RecentDonations = () => {
  const { data, isLoading } = useGetRecentDonationsQuery(undefined);
  const donations = data?.data;
  const bouncedLoading = useLoadingBounce(isLoading);
  return (
    <section className=" md:p-5  p-3 bg-white border-2 border-gray-600/10 rounded-lg ">
      <div className="flex justify-between items-center">
        <h1 className="md:text-2xl text-xl font-semibold ">Recent Donations</h1>

        <button className=" flex items-center gap-1 border-b font-semibold text-amber-600 hover:text-black md:text-lg text-[0.8rem]">
          <span>View All</span>
          <span>
            <FaLongArrowAltRight />
          </span>
        </button>
      </div>
      <div className="h-[60vh]  overflow-y-auto">
        <div className="mt-5 my-4  ">
          {bouncedLoading
            ? Array.from({ length: 4 }).map((_, index) => <DonationLoadingCard key={index} />)
            : donations?.map((donation) => (
                <DonationManageCard donation={donation} key={donation._id} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default RecentDonations;

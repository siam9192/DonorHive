import { Link } from "react-router-dom";
import useLoadingBounce from "../../../hooks/useLoadingBounce";
import { useGetMyRecentDonationsQuery } from "../../../redux/features/donation/donation.api";
import DonationCard from "../../cards/DonationCard";
import MyDonationCard from "../../cards/MyDonationCard";
import DonationLoadingCard from "../../loading-cards/DonationLoadingCard";

const MyRecentDonations = () => {
  const { data, isLoading } = useGetMyRecentDonationsQuery(undefined);
  const donations = data?.data;
  const bouncedLoading = useLoadingBounce(isLoading);

  return (
    <section className="py-10">
      <div className="flex justify-between items-center">
        <h1 className="md:text-2xl text-xl font-semibold">
          Recent <span className="text-primary">Donations</span>
        </h1>
        <Link to="/profile/my-donations">
          <button className="font-medium border-b">View All</button>
        </Link>
      </div>
      <div className="mt-5 my-4 ">
        {bouncedLoading ? (
          Array.from({ length: 6 }).map((_, index) => <DonationLoadingCard key={index} />)
        ) : donations?.length ? (
          donations?.map((donation) => <MyDonationCard donation={donation} key={donation._id} />)
        ) : (
          <div className="h-40 flex justify-center items-center">
            <h1 className="text-xl">No recent donations</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyRecentDonations;

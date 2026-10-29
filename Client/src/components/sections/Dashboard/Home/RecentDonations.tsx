import { FaLongArrowAltRight } from "react-icons/fa";
import DonationManageCard from "../../../cards/DonationManageCard";
import { useGetRecentDonationsQuery } from "../../../../redux/features/donation/donation.api";
import useLoadingBounce from "../../../../hooks/useLoadingBounce";
import DonationLoadingCard from "../../../loading-cards/DonationLoadingCard";
import { Link } from "react-router-dom";

const RecentDonations = () => {
  const { data, isLoading } = useGetRecentDonationsQuery(undefined);
  const donations = data?.data;
  const bouncedLoading = useLoadingBounce(isLoading);
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">Recent donations</h2>
          <p className="mt-1 text-sm text-slate-500">The latest gifts from your community.</p>
        </div>
        <Link
          to="/dashboard/manage-donations"
          className="inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
        >
          View all <FaLongArrowAltRight />
        </Link>
      </div>
      <div className="mt-5 max-h-[420px] overflow-y-auto">
        <div className="space-y-3">
          {bouncedLoading
            ? Array.from({ length: 4 }).map((_, index) => <DonationLoadingCard key={index} />)
            : donations?.length
              ? donations.map((donation) => (
                  <DonationManageCard donation={donation} key={donation._id} />
                ))
              : <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No donations yet.</p>}
        </div>
      </div>
    </section>
  );
};

export default RecentDonations;

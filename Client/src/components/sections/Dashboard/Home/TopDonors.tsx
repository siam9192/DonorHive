import DonorCard from "../../../cards/DonorCard";
import { useGetTopDonorsQuery } from "../../../../redux/features/overview/overview.api";
import useLoadingBounce from "../../../../hooks/useLoadingBounce";

const TopDonors = () => {
  const { data, isLoading } = useGetTopDonorsQuery(undefined);
  const donors = data?.data;
  const bouncedLoading = useLoadingBounce(isLoading);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">Top donors</h2>
      <p className="mt-1 text-sm text-slate-500">The generous people powering your community.</p>
      <div className="mt-5 max-h-[360px] space-y-3 overflow-y-auto customize-scrollbar">
        {bouncedLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-16 animate-pulse rounded-xl bg-slate-100"></div>
            ))
          : donors?.length
            ? donors.map((donor) => <DonorCard donor={donor} key={donor._id} />)
            : <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No donor activity yet.</p>}
      </div>
    </section>
  );
};

export default TopDonors;

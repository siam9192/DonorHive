import { useGetAdminSummaryQuery } from "../../../../redux/features/overview/overview.api";

const DonationStates = () => {
  const { data: response, isLoading } = useGetAdminSummaryQuery(undefined);
  const summary = response?.data;
  const activity = [
    { label: "Donations", value: summary?.donationsCount || 0 },
    { label: "Campaigns", value: summary?.campaignsCount || 0 },
    { label: "Community", value: summary?.usersCount || 0 },
  ];
  const maxTotal = Math.max(...activity.map((item) => item.value), 1);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">Community at a glance</h2>
        <p className="mt-1 text-sm text-slate-500">A snapshot of activity across your platform.</p>
      </div>
      <div className="mt-7 space-y-5">
        {activity.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600">{item.label}</span>
              <span className="font-semibold tabular-nums text-slate-900">
                {isLoading ? "—" : item.value.toLocaleString()}
              </span>
            </div>
            <div
              className="h-2.5 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-label={item.label}
              aria-valuenow={item.value}
              aria-valuemin={0}
              aria-valuemax={maxTotal}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-300 transition-[width] duration-700"
                style={{ width: `${isLoading ? 0 : (item.value / maxTotal) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DonationStates;

import { useGetRecentUsersQuery } from "../../../../redux/features/user/user.api";
import UserCard from "../../../cards/UserCard";
import { Link } from "react-router-dom";

const RecentUsers = () => {
  const { data, isLoading } = useGetRecentUsersQuery(undefined);
  const users = data?.data || [];
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">New members</h2>
          <p className="mt-1 text-sm text-slate-500">People who recently joined your community.</p>
        </div>
        <Link
          to="/dashboard/manage-users"
          className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
        >
          View all <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="mt-5 max-h-[420px] overflow-y-auto">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-20 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : users.length ? (
          <div className="space-y-3">
            {users.map((user) => <UserCard user={user} key={user._id} />)}
          </div>
        ) : (
          <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            No recent members.
          </p>
        )}
      </div>
    </section>
  );
};

export default RecentUsers;

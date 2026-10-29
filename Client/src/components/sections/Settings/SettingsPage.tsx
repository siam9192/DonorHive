import { FaArrowRight, FaRegUserCircle } from "react-icons/fa";
import { FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../../provider/CurrentUserProvider";
import { EUserRole } from "../../../types/user.type";

const SettingsPage = () => {
  const { user } = useCurrentUser();
  const isAdmin = user?.role === EUserRole.Admin;
  const editProfilePath = isAdmin
    ? "/dashboard/edit-profile"
    : "/profile/edit-personal-information";
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section>
        <p className="text-sm font-medium text-emerald-700">Account</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Review your account details and manage your personal information.
        </p>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
          <img
            src={user?.profilePhotoUrl || "/images/default-profile.png"}
            alt=""
            className="size-16 rounded-full bg-slate-100 object-cover ring-4 ring-emerald-50"
          />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold text-slate-900">
              {user?.fullName || "Your account"}
            </h2>
            <p className="mt-1 truncate text-sm text-slate-500">
              {user?.email || "No email address"}
            </p>
          </div>
          <Link
            to={editProfilePath}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:self-center"
          >
            Edit profile <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        <dl className="grid gap-px bg-slate-100 sm:grid-cols-2">
          <div className="bg-white p-5 sm:p-6">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Account type
            </dt>
            <dd className="mt-2 font-medium text-slate-800">{user?.role || "Not available"}</dd>
          </div>
          <div className="bg-white p-5 sm:p-6">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Member since
            </dt>
            <dd className="mt-2 font-medium text-slate-800">{memberSince}</dd>
          </div>
          <div className="bg-white p-5 sm:p-6">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Phone number
            </dt>
            <dd className="mt-2 font-medium text-slate-800">
              {user?.phoneNumber || "Not added"}
            </dd>
          </div>
          <div className="bg-white p-5 sm:p-6">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Sign-in method
            </dt>
            <dd className="mt-2 font-medium text-slate-800">
              {user?.provider || "Not available"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          to={editProfilePath}
          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md sm:p-6"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-700">
            <FaRegUserCircle aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-slate-900">Personal information</span>
            <span className="mt-1 block text-sm leading-5 text-slate-500">
              Update your name, contact details, and profile information.
            </span>
          </span>
          <FaArrowRight
            aria-hidden="true"
            className="mt-1 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-700"
          />
        </Link>

        <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xl text-sky-700">
            <FiShield aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-semibold text-slate-900">Account access</h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              You sign in using {user?.provider || "your registered account"}. Your account status
              is{" "}
              <span className="font-medium text-slate-700">
                {user?.status || "not available"}.
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;

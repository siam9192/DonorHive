import { FiDollarSign } from "react-icons/fi";
import { ITopDonor } from "../../types/overview.type";

interface IProps {
  donor: ITopDonor;
}

const DonorCard = ({ donor }: IProps) => {
  return (
    <article className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition hover:border-emerald-100 hover:bg-emerald-50/40">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={donor.profilePhotoUrl || "https://cdn-icons-png.flaticon.com/512/3001/3001758.png"}
          alt=""
          className="size-11 shrink-0 rounded-full bg-white object-cover"
        />
        <div>
          <h3 className="truncate text-sm font-semibold text-slate-800">{donor.fullName}</h3>
          <p className="mt-0.5 text-xs text-slate-500">Top community supporter</p>
        </div>
      </div>
      <p className="shrink-0 text-sm font-semibold tabular-nums text-emerald-800">
        <FiDollarSign className="mr-0.5 inline" />
        {donor.donatedAmount.toLocaleString()}
      </p>
    </article>
  );
};

export default DonorCard;

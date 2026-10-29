import { ReactNode } from "react";
import CountUp from "react-countup";

interface IProps {
  data: {
    title: string;
    value: string | number;
    icon: ReactNode;
    prefix?: string;
  };
}

const DashboardSummaryCard = ({ data }: IProps) => {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-slate-500">{data.title}</h2>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {typeof data.value === "number" ? (
              <CountUp
                start={0}
                end={data.value}
                duration={1.5}
                prefix={data.prefix}
                separator=","
                decimals={data.prefix ? 2 : 0}
              />
        ) : (
          data.value
        )}
          </p>
        </div>
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-700 sm:size-12 sm:text-2xl">
          {data.icon}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/70 via-emerald-300 to-transparent" />
    </article>
  );
};

export default DashboardSummaryCard;

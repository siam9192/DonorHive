interface IProps {
  activity: {
    id: string;
    title: string;
    description: string;
    coverPhotoUrl: string;
  };
}
const ActivityCard = ({ activity }: IProps) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 md:flex">
      <img
        src={activity.coverPhotoUrl}
        alt=""
        className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-auto md:w-[40%]"
      />
      <div className="p-5 md:flex-1 md:p-6">
        <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
          {activity.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 font-secondary md:text-base">
          {activity.description}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
          View story <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
};

export default ActivityCard;

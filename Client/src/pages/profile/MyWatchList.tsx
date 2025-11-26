import { useRef, useState } from "react";
import WatchListCard from "../../components/cards/WatchListCard";
import { useGetMyWatchListedItemsQuery } from "../../redux/features/watch-list-item/watch-list-item.api";
import useLoadingBounce from "../../hooks/useLoadingBounce";
import Pagination from "../../components/pagination/Pagination";

const MyWatchList = () => {
  const [page, setPage] = useState(1);
  const params = [
    {
      name: "page",
      value: page,
    },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { data, isFetching, isLoading } = useGetMyWatchListedItemsQuery(params);
  const items = data?.data;
  const meta = data?.meta;
  const bouncedLoading = useLoadingBounce(isLoading);
  return (
    <div>
      <h1 className="md:text-3xl text-2xl font-semibold">My WatchList</h1>
      <div className="mt-5 flex justify-between">
        <p className="text-primary font-medium font-secondary text-xl">
          {meta?.totalResult} Campaigns
        </p>
        {/* <select
          name=""
          id=""
          className="md:w-1/3 w-1/2 px-2 py-3 border-2 border-gray-700/20 outline-secondary rounded-md"
        >
          <option value="">Sortby (Default)</option>
          {Array.from({ length: 10 }).map((_, index) => (
            <option key={index}>Option {index + 1}</option>
          ))}
        </select> */}
      </div>
      {meta?.totalResult ? (
        <div ref={ref} className="mt-10 grid  grid-cols-1 md:gap-5 gap-3">
          <div>{items?.map((_, index) => <WatchListCard item={_} key={_._id} />)}</div>
        </div>
      ) : (
        <div className="mt-10 text-center">
          {" "}
          <p className="text-2xl">No campaign watch listed</p>
        </div>
      )}
      {meta && meta.totalResult ? (
        <div className="mt-5">
          <Pagination
            {...meta}
            onPageChange={(page) => {
              setPage(page);
              ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MyWatchList;

import React, { ChangeEvent, useRef, useState } from "react";
import MyDonationCard from "../../components/cards/MyDonationCard";
import { IoChevronDownOutline } from "react-icons/io5";
import useLoadingBounce from "../../hooks/useLoadingBounce";
import { useGetMyDonationsQuery } from "../../redux/features/donation/donation.api";
import Pagination from "../../components/pagination/Pagination";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IParam } from "../../interfaces/response.interface";
import { handelSearch } from "../../utils/function";

const sortOptions = [
  {
    display: "Sortby(Default)",
    value: "",
  },
  {
    display: "Date(asc)",
    value: "createdAt-asc",
  },
  {
    display: "Date(desc)",
    value: "createdAt-desc",
  },

  {
    display: "amount(asc)",
    value: "amount-asc",
  },
  {
    display: "amount(desc)",
    value: "amount-desc",
  },
];

const MyDonations = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [page, setPage] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const params: IParam[] = [
    {
      name: "page",
      value: page,
    },
    {
      name: "limit",
      value: 5,
    },
  ];
  searchParams.forEach((value, key) => {
    params.push({ name: key, value });
  });

  const { data, isLoading, isFetching, refetch } = useGetMyDonationsQuery(params);
  const donations = data?.data;
  const bouncedLoading = useLoadingBounce(isLoading);
  const meta = data?.meta;

  const handelSorting = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [sortBy, sortOrder] = value.split("-");

    handelSearch(
      [
        { name: "sortBy", value: sortBy },
        { name: "sortOrder", value: sortOrder },
      ],
      navigate,
    );
  };
  return (
    <div ref={ref}>
      <h1 className="md:text-3xl text-2xl font-semibold">My Donations</h1>
      <div className="min-h-[60vh]">
        <div className="mt-5 flex  justify-between items-center">
          <p className="text-[1rem] font-medium text-primary">{meta?.totalResult} Donations</p>
          {/* <div className=" lg:w-1/4 md:w-1/2 w-1/2 flex  items-center justify-between  p-3 border-2 border-gray-400/40 rounded-md">
          <p className=" font-semibold text-primary">Sort By</p>
          <button className="text-2xl">
            <IoChevronDownOutline />
          </button>
        </div> */}

          <select
            name=""
            id=""
            className="px-4 py-2 border-2 border-secondary outline-none rounded-md"
            onChange={handelSorting}
          >
            <option value="">Sort By(Default)</option>
            {sortOptions.map((_, index) => (
              <option value={_.value} key={_.value}>
                {_.display}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-10 min-h-[30vh]  gap-5">
          {bouncedLoading || isFetching
            ? Array.from({ length: 10 }).map((_, index) => (
                <div className="h-40 mt-4  animate-pulse bg-gray-200 rounded-md" key={index}></div>
              ))
            : donations?.map((_, index) => <MyDonationCard donation={_} key={_._id} />)}
        </div>
      </div>
      {meta && (
        <div className="mt-5">
          <Pagination
            {...meta}
            onPageChange={(page) => {
              setPage(page);
              refetch();
              ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyDonations;

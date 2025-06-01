import React, { useRef, useState } from "react";
import ManageCampaignCard from "../../../cards/ManageCampaignCard";
import Pagination from "../../../pagination/Pagination";
import { IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import ManageDonationTableCard from "../../../cards/ManageDonationTableCard";
import SearchTermInput from "../../../input/SearchTermInput";
import Select from "../../../select/Select";
import { EDonationStatus, EDonorType } from "../../../../types/donation.type";
import { useGetDonationsForManageQuery } from "../../../../redux/features/donation/donation.api";

type THead = {
  name: string;
  value: string;
  isSortable: boolean;
};

type TOrder = "asc" | "desc";

const heads: THead[] = [
  {
    name: "amount",
    value: "amount",
    isSortable: true,
  },
  {
    name: "Campaign Name",
    value: "campaignName",
    isSortable: false,
  },

  {
    name: "donor",
    value: "raised",
    isSortable: false,
  },
  {
    name: "status",
    value: "status",
    isSortable: false,
  },
  {
    name: "created at",
    value: "createdAt",
    isSortable: true,
  },
  {
    name: "updated at",
    value: "updatedAt",
    isSortable: true,
  },
  {
    name: "Actions",
    value: "actions",
    isSortable: false,
  },
];

type TSort = {
  by: string;
  order: TOrder;
};

const statusSelectOptions = [
  { display: "All Status", value: "" },
  ...Object.values(EDonationStatus).map((st) => ({
    display: st,
    value: st,
  })),
];

const donorTypeSelectOptions = [
  {
    display: "All Donor",
    value: "",
  },
  ...Object.entries(EDonorType).map(([key, value]) => ({
    display: key,
    value,
  })),
];

const DashboardShowDonations = () => {
  const [sort, setSort] = useState<TSort>({
    by: "createdAt",
    order: "desc",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [donorType, setDonorType] = useState("");
  const [page, setPage] = useState(1);
  const handelSetSort = (value: string, order: TOrder) => setSort({ by: value, order });

  const params = [
    {
      name: "searchTerm",
      value: searchTerm,
    },
    {
      name: "status",
      value: status,
    },
    {
      name: "donorType",
      value: donorType,
    },
    {
      name: "orderBy",
      value: sort.by,
    },

    {
      name: "sortOrder",
      value: sort.order,
    },
    {
      name: "page",
      value: page,
    },
  ];

  const { data } = useGetDonationsForManageQuery(params);
  const donations = data?.data;
  const meta = data?.meta;

  return (
    <section className="my-10 ">
      {/* Filter */}
      <div className=" flex  md:flex-row flex-col justify-between md:items-center lg:gap-0 gap-2  ">
        <div className="lg:w-1/3 md:w-1/2">
          <SearchTermInput
            placeholder="Enter.. ID(user,campaign) Name(campaign,donor)"
            onChange={(v) => {
              setSearchTerm(v);
              setPage(1);
            }}
          />
        </div>
        <div className="lg:w-1/3 md:w-1/2 grid  grid-cols-2 gap-2">
          <Select options={statusSelectOptions} onChange={(value) => setStatus(value)} />
          <Select options={donorTypeSelectOptions} onChange={(value) => setDonorType(value)} />
        </div>
      </div>
      <h4 className=" mt-5 text-xl font-semibold  text-primary">
        {meta?.totalResult} Donations Found
      </h4>

      {/* Table */}
      <div className="  py-5 relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              {heads.map((head) => (
                <th scope="col" key={head.name} className="px-6 py-3 text-[1rem] font-semibold ">
                  <div className="flex items-center gap-2">
                    <span>{head.name}</span>
                    {head.isSortable && (
                      <div className="">
                        <button
                          onClick={() => handelSetSort(head.value, "desc")}
                          className={`text-xl  font-medium ${sort.by === head.value && sort.order === "desc" ? "text-primary" : ""}`}
                        >
                          <IoMdArrowDropup />
                        </button>
                        <button
                          onClick={() => handelSetSort(head.value, "asc")}
                          className={`text-xl  font-medium ${sort.by === head.value && sort.order === "asc" ? "text-primary" : ""}`}
                        >
                          <IoMdArrowDropdown />
                        </button>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meta?.totalResult ? (
              donations?.map((_, index) => <ManageDonationTableCard donation={_} key={index} />)
            ) : (
              <div className="h-52 p-10 ">
                <h1 className="text-xl font-medium"> No donations found</h1>
              </div>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {meta && (
        <div className="py-5 ">
          <Pagination
            {...meta}
            onPageChange={(p) => {
              setPage(p);
              containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        </div>
      )}
    </section>
  );
};

export default DashboardShowDonations;

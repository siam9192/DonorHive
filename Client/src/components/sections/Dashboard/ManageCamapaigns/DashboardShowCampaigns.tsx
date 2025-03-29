import React, { useRef, useState } from "react";
import ManageCampaignCard from "../../../cards/ManageCampaignCard";
import Pagination from "../../../pagination/Pagination";
import { IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useGetCampaignsForManageQuery } from "../../../../redux/features/campaign/campaign.api";
import categories from "../../../../data/categories";
import Select from "../../../select/Select";
import SearchTermInput from "../../../input/SearchTermInput";


type THead = {
  name: string;
  value: string;
  isSortable: boolean;
};

type TOrder = "asc" | "desc";

const heads: THead[] = [
  {
    name: "title",
    value: "title",
    isSortable: true,
  },
  {
    name: "category",
    value: "category",
    isSortable: true,
  },

  {
    name: "Raised Amount",
    value: "raisedAmount",
    isSortable: true,
  },
  {
    name: "Target Amount",
    value: "targetAmount",
    isSortable: true,
  },
  {
    name: "end in",
    value: "end_at",
    isSortable: true,
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

const DashboardShowCampaigns = () => {
  const [sort, setSort] = useState<TSort>({
    by: "createdAt",
    order: "desc",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const params = [
    {
      name: "searchTerm",
      value: searchTerm,
    },
    {
      name: "category",
      value: category,
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

  const { data } = useGetCampaignsForManageQuery(params);
  const campaigns = data?.data;
  const meta = data?.meta;
  const handelSetSort = (value: string, order: TOrder) => setSort({ by: value, order });

  const selectCategoryOptions = categories.map((category) => ({
    display: category,
    value: category,
  }));

  selectCategoryOptions.unshift({
    display: "All Categories",
    value: "",
  });

  return (
    <section className="mt-10 ">
      {/* Filter */}
      <div className=" flex  md:flex-row flex-col justify-between md:items-center lg:gap-0 gap-2  ">
        <div className="lg:w-1/3 md:w-1/2">
          <SearchTermInput
            placeholder="ID or Search keyword.."
            onChange={(v) => {
              setSearchTerm(v);
              setPage(1);
            }}
          />
        </div>
        <div className="lg:w-1/3 md:w-1/2">
          <Select options={selectCategoryOptions} onChange={(value) => setCategory(value)} />
        </div>
      </div>
      <h4 className=" mt-5 text-xl font-semibold  text-primary">
        {meta?.totalResult} Campaigns Found
      </h4>

      {/* Table */}
      <div ref={containerRef} className="  py-5 relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
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
        {
         meta?.totalResult ?
         campaigns?.map((_, index) => <ManageCampaignCard campaign={_} key={index} />)
         :
        <div className="h-52 p-10 ">
           <h1 className="text-xl font-medium"> No campaigns found</h1>
        </div>
        }
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      { meta && meta.totalResult>0 && (
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

export default DashboardShowCampaigns;

import React, { useRef, useState } from "react";
import ManageCampaignCard from "../../../cards/ManageCampaignCard";
import Pagination from "../../../pagination/Pagination";
import { IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import ManageUserTableCard from "../../../cards/ManageUserTableCard";
import { useGetUsersForManageQuery } from "../../../../redux/features/user/user.api";
import SearchTermInput from "../../../input/SearchTermInput";
import Select from "../../../select/Select";
import { EUserStatus } from "../../../../types/user.type";

type THead = {
  name: string;
  value: string;
  isSortable: boolean;
};

type TOrder = "asc" | "desc";

const heads: THead[] = [
  {
    name: "name",
    value: "fullName",
    isSortable: true,
  },
  {
    name: "email",
    value: "email",
    isSortable: true,
  },
  {
    name: "provider",
    value: "provider",
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

const selectStatusOptions = [
{
  display:"All Status",
  value:''
},
  {
    display:EUserStatus.Active,
    value:EUserStatus.Active
  },
  {
    display:EUserStatus.Blocked,
    value:EUserStatus.Blocked
  }
]

const DashboardShowUsers = () => {
  const [sort, setSort] = useState<TSort>({
    by: "createdAt",
    order: "desc",
  });

  const handelSetSort = (value: string, order: TOrder) => setSort({ by: value, order });
   const containerRef = useRef<HTMLDivElement>(null);
 const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

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

  const { data } = useGetUsersForManageQuery(params);
  const users = data?.data;
  const meta =  data?.meta

  
  return (
    <section className="my-10 ">
      {/* Filter */}
      <div className=" flex  md:flex-row flex-col justify-between md:items-center lg:gap-0 gap-2  ">
        <div className="lg:w-1/3 md:w-1/2">
          <SearchTermInput
            placeholder="ID,Name,Email.. search"
            onChange={(v) => {
              setSearchTerm(v);
              setPage(1);
            }}
          />
        </div>
        <div className="lg:w-1/3 md:w-1/2">
          <Select options={selectStatusOptions} onChange={(value) => setStatus(value)} />
        </div>
      </div>
      <h4 className=" mt-5 text-xl font-semibold  text-primary">{meta?.totalResult} Users Found</h4>

      {/* Table */}
      <div ref={containerRef} className="  py-5 relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 d">
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
        users?.map((_, index) => <ManageUserTableCard user={_} key={index} />)
         :
        <div className="h-52 p-10 ">
           <h1 className="text-xl font-medium"> No users found</h1>
        </div>
        }
          </tbody>
        </table>
      </div>
      {/* Pagination */}
     {
      meta &&  <div className="py-5 ">
      <Pagination {...meta}  onPageChange={(p) => {
              setPage(p);
              containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }} />
    </div>
     }
    </section>
  );
};

export default DashboardShowUsers;

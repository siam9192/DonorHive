import React, { useState } from "react";
import ManageCampaignCard from "../../../cards/ManageCampaignCard";
import Pagination from "../../../pagination/Pagination";
import { IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

type THead  = {
    name:string,
    value:string,
    isSortable:boolean
}

type TOrder = 'asc'|'desc'

const heads:THead[] = [
   {
    name:"name",
    value:"fullName",
    isSortable:true
   },
   {
    name:"category",
    value:"category",
    isSortable:true
   },
   {
    name:"total collection",
    value:"raised",
    isSortable:true
   },
   {
    name:"end in",
    value:"end_at",
    isSortable:true
   },
   {
    name:"status",
    value:"status",
    isSortable:false
   },
   {
    name:"created at",
    value:"createdAt",
    isSortable:true
   },
   {
    name:"updated at",
    value:"updatedAt",
    isSortable:true
   },
   {
    name:"Actions",
    value:'actions',
    isSortable:false
   },
  ];

  type TSort = {
    by:string,
    order:TOrder
  }

const DashboardShowCampaigns = () => {
  const [sort,setSort] = useState<TSort>({
    by:'createdAt',
    order:'asc'
  })

  const handelSetSort = (value:string,order:TOrder)=>setSort({by:value,order})

  return (
    <section className="mt-10 ">
        {/* Filter */}
      <div className=" flex  md:flex-row flex-col justify-between md:items-center lg:gap-0 gap-2  ">
        <div className="lg:w-1/3 md:w-1/2 flex items-center bg-gray-100">
          <span className=" p-4 flex justify-center items-center bg-primary text-3xl text-white">
            <IoSearchOutline />
          </span>
          <input
            type="text"
            placeholder="Search campaign by keyword.."
            className=" outline-none w-full  px-2 py-4 placeholder:font-secondary"
          />
        </div>
        <div className=" lg:w-1/4 md:w-1/2 flex  items-center justify-between  p-4 border-2 border-gray-400/40 rounded-md">
          <p className=" font-semibold text-primary">All Category</p>
          <button className="text-2xl">
            <IoChevronDownOutline />
          </button>
        </div>
      </div>
      <h4 className=" mt-5 text-xl font-semibold  text-primary">20 Campaigns Found</h4>
      
      {/* Table */}
      <div className="  py-5 relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {heads.map((head) => (
                <th scope="col" key={head.name} className="px-6 py-3 text-[1rem] font-semibold ">
                 <div className="flex items-center gap-2">
                      <span>
                      {head.name}
                      </span>
                   {
                    head.isSortable &&    <div className="">
                    <button onClick={()=>handelSetSort(head.value,'desc')} className={`text-xl  font-medium ${sort.by===head.value && sort.order === "desc" ?"text-primary":"" }`}>
                    <IoMdArrowDropup />
                    </button>
                    <button onClick={()=>handelSetSort(head.value,'asc')} className={`text-xl  font-medium ${sort.by===head.value && sort.order === "asc" ?"text-primary":"" }`}>
                    <IoMdArrowDropdown />
                    </button>
                  </div>
                   }
                 </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({
              length: 20,
            }).map((_, index) => (
              <ManageCampaignCard key={index} />
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="py-5 ">
        <Pagination total={30} limit={5} page={3} onPageChange={() => {}} />
      </div>

    
    </section>
  );
};

export default DashboardShowCampaigns;

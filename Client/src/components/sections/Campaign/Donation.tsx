import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import DonorDetailsForm from "../../ui/DonorDetailsForm";

const Donation = () => {
  const [selectedAmount,setSelectedAmount] = useState<number|null>()
  const featuredAmounts = [20, 50, 80, 100, 150, 200, 250, 300, 350, 500];
 
  const [isAnonymously,setIsAnonymously] = useState(false)

  return (
    <section className="p-5 shadow  min-h-[700px]">
      <h2 className="text-2xl font-medium text-gray-950">Secure Donation</h2>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {featuredAmounts.map((amount) => (
          <button onClick={()=>setSelectedAmount(amount)} className={`w-full py-2  border-gray-600/15 rounded-md ${selectedAmount === amount ? 'border-primary border-2':'border'}`}>{amount}</button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 px-3 border-2 border-gray-700/10 rounded-lg">
        <span className="text-xl ">
          <FiDollarSign />
        </span>
        <input  onChange={(e)=>!isNaN(Number(e.target.value) ) && setSelectedAmount(parseFloat(e.target.value))} type="text" defaultValue={selectedAmount||''}  className="w-full py-3 outline-none text-xl text-primary font-medium" />
        <p className="text-gray-500">USD</p>
      </div>
      <div className=" mt-8 flex items-center gap-2">
        <input
         onChange={(e)=>setIsAnonymously(e.target.checked)}
        type="checkbox" className="size-5 accent-secondary " />
        <label htmlFor="" className="text-gray-600 font-medium font-secondary">
          Donate as anonymously
        </label>
      </div>

{
    !isAnonymously ?  <DonorDetailsForm/> : null
}

      <button className=" mt-10 text-gray-900 border-b font-medium">Add comment</button>
      <div className="mt-14">
        <button disabled={!selectedAmount}  className="py-3 disabled:bg-gray-100 disabled:text-gray-600 bg-primary text-white font-semibold w-full rounded-lg font-secondary">
          Donate   {selectedAmount ? '$'+selectedAmount :'' }
        </button>
      </div>
    </section>
  );
};

export default Donation;

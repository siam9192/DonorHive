import React, { useState } from 'react'
import { IoChevronDownOutline } from 'react-icons/io5'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
const AddCampaignForm = () => {
    const endDate = new Date()
    endDate.setMonth(new Date().getMonth()+6)
    const [dateState, setDateState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
  return (
  <form action="">
    <h1 className='lg:text-3xl text-2xl font-semibold '>
        Add New Campaign
    </h1>
    <div className='mt-10'>
        <div className= 'lg:h-60 h-52  border-2 hover:bg-gray-50 rounded-md text-gray-700/15 flex flex-col gap-2 justify-center items-center'>
        <img src="https://icones.pro/wp-content/uploads/2021/08/icone-photo-bleue.png" alt=""  className='size-32 '/>
        <p className='text-gray-800 font-medium'>
            Cover photo
        </p>
        </div>

        <div className='mt-5 space-y-4'>
            <input type="text" placeholder='Campaign Name' className='w-full py-3 px-2 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary'  />
               <div className="  flex  items-center justify-between  p-4 border-2 border-gray-400/40 rounded-md">
                        <p className=" font-semibold text-primary">All Category</p>
                        <button className="text-2xl">
                          <IoChevronDownOutline />
                        </button>
                      </div>
            <textarea placeholder='Description' className='w-full py-3 px-2 h-52 border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary'  />
        </div>
        <div className='mt-5  overflow-x-auto'>
            <h3 className='mb-2 md:text-xl text-lg text-gray-800 font-medium'>Select Start Date & End Date</h3>
        <DateRange
  editableDateInputs={true}
  onChange={item => setDateState([item.selection as any])}
  moveRangeOnFirstSelection={false}
  ranges={dateState as any}
  
/>
        </div>
    </div>
    <div className='mt-5 lg:text-end'>
        <button className=' py-3 lg:w-1/2 w-full bg-primary text-white rounded-md'>Submit</button>
    </div>
  </form>
  )
}

export default AddCampaignForm
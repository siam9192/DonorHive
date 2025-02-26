import React from 'react'
import Container from '../../container/Container'
import { IoChevronDownOutline, IoSearchOutline } from 'react-icons/io5'

const CampaignFilterBox = () => {
  return (
   
  <section className='py-10'>
        <Container  >
     <div className=' flex  md:flex-row flex-col justify-between md:items-center lg:gap-0 gap-2  '>
     <div className=' lg:w-1/4 md:w-1/2 flex  items-center justify-between  p-4 border-2 border-gray-400/40 rounded-md'>
     <p className=' font-semibold text-primary'>All Category</p>
     <button className='text-2xl'>
     <IoChevronDownOutline />
     </button>
         </div>

         <div className='lg:w-1/3 md:w-1/2 flex items-center bg-gray-100'>
         <span className=' p-4 flex justify-center items-center bg-primary text-3xl text-white'>
         <IoSearchOutline />
         </span>
          <input type="text" placeholder='Search campaign by keyword..' className=' outline-none w-full  px-2 py-4 placeholder:font-secondary' />
         </div>
     </div>
      </Container>
  </section>
   
  )
}

export default CampaignFilterBox
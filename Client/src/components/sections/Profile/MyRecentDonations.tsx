
import DonationCard from '../../cards/DonationCard'

const MyRecentDonations = () => {
  return (
  <section className='py-10'>
 <div className='flex justify-between items-center'>
 <h1 className='md:text-2xl text-xl font-semibold'>Recent <span className='text-primary'>Donations</span></h1>
 <button className='font-medium border-b'>
    View All
 </button>
 </div>
   <div className='mt-5 space-y-3'>
    {
        Array.from({length:4}).map((_,index)=>(<DonationCard key={index}/>))
    }
   </div>
  </section>
  )
}

export default MyRecentDonations
import { ReactNode, UIEvent, useEffect, useRef, useState } from "react";
import DonationCard from "../cards/DonationCard";
import { useGetCampaignDonationsQuery } from "../../redux/features/donation/donation.api";
import useLoadingBounce from "../../hooks/useLoadingBounce";
import DonationLoadingCard from "../loading-cards/DonationLoadingCard";
import { IDonation } from "../../types/donation.type";
import { IParam } from "../../interfaces/response.interface";

interface IProps {
  children: ReactNode;
  id: string;
}

const ViewAllDonationsPopup = ({ children, id }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allDonations, setAllDonations] = useState<IDonation[]>([]);
  const [page,setPage] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const params:IParam[] = [
  {
    name:'page',
    value:page
  }
  ]

  const { data, isLoading,isFetching,refetch} = useGetCampaignDonationsQuery({id,params});
  const donations = data?.data;
  const meta = data?.meta;
  const bouncedLoading = useLoadingBounce(isLoading);
  
  const totalPage = meta ?  Math.ceil(meta?.totalResult/meta?.limit) :0
  const handelOnScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
      if((!bouncedLoading &&!isLoading&&!isFetching) && page < totalPage){
         setPage(p=>p+1)
         refetch()
      }
    }
  };

  useEffect(()=>{
    if(!isLoading && !isFetching && donations?.length){
      setAllDonations(prev=>[...prev,...donations])
    }
  },[
    isFetching
  ])

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{children}</button>
      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 w-full h-full bg-gray-900/75 flex justify-center items-center p-2 z-50 auth-popup"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lg:w-1/2 md:w-10/12 w-full min-h-[40vh] max-h-[90vh] bg-white rounded-md md:p-5 p-2"
          >
            <h1 className="md:text-2xl text-xl font-medium  text-black py-3">
              Donations (<span className="text-primary font-semibold">{meta?.total}</span>)
            </h1>

            <div
              ref={ref}
              onScroll={handelOnScroll}
              className="h-[70vh] md:h-[80vh] no-scrollbar overflow-y-auto mb-2"
            >
              <div className="mt-5 my-4 ">
                {bouncedLoading ? (
                  Array.from({ length: 6 }).map((_, index) => <DonationLoadingCard key={index} />)
                ) : donations?.length ? (
                 allDonations?.map((donation) => (
                    <DonationCard donation={donation} key={donation._id} />
                  ))
                ) : (
                  <div className="h-full">
                    <img className="w-1/2   mx-auto" src="/images/donations.png" alt="" />
                    <h1 className="text-center text-2xl font-medium text-gray-800">
                      Currently have no donations
                    </h1>
                  </div>
                )}
              </div>
              {
                isFetching ? <p className="mt-2">Loading...</p>:null
              }
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ViewAllDonationsPopup;

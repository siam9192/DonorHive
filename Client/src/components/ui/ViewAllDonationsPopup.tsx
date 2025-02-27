import { ReactNode, useEffect, useState } from "react";
import DonationCard from "../cards/DonationCard";

interface IProps {
  children: ReactNode;
}

const ViewAllDonationsPopup = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

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
              Donations (<span className="text-primary font-semibold">1K</span>)
            </h1>
            {/* <div>
       <img className="w-1/2  mx-auto" src="/images/donations.png" alt="" />
       <h1 className="text-center text-2xl font-medium text-gray-800">
        Current have no donations
       </h1>
       </div> */}
            <div className="h-[70vh] md:h-[80vh] no-scrollbar overflow-y-auto mb-2">
              {Array.from({ length: 20 }).map((_, index) => (
                <DonationCard />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ViewAllDonationsPopup;

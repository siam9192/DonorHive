import React, { ReactNode, useEffect, useState } from "react";
import Donation from "../sections/Campaign/Donation";
import { RxCross1 } from "react-icons/rx";
import { ICampaign } from "../../types/campaign.type";

interface IProps {
  children: ReactNode;
  campaign: ICampaign;
}

const DonationPopup = ({ children, campaign }: IProps) => {
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
          className="fixed rotate-0 left-0 top-0 w-full h-full bg-gray-900/75 flex justify-center items-center  z-50 auth-popup"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full  h-full overflow-y-auto customize-scrollbar   bg-white md:p-10 p-5 z-[1000] relative "
          >
            <div className="donation-popup-form">
              <Donation campaign={campaign} />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-xl bg-red-100 p-2 text-black"
            >
              <RxCross1 />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DonationPopup;

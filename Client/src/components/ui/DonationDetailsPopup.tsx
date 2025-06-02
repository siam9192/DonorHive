import { ReactNode, useEffect, useState } from "react";
import "../../styles/Animation.style.css";
import DonationDetails from "./DonationDetails";

interface IProps {
  children: ReactNode;
  enableManageButtons?: boolean;
  id: string;
}

const DonationDetailsPopup = ({ children, enableManageButtons, id }: IProps) => {
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
          className="fixed inset-0 w-full h-full bg-gray-900/75 flex justify-center items-center p-2 z-50 animate-popup-scale"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lg:w-1/3 md:w-10/12 w-full max-h-[80vh]  overflow-y-auto no-scrollbar  bg-white rounded-md md:p-10 p-5  "
          >
            <DonationDetails
              enableManageButtons={enableManageButtons}
              closePopup={() => setIsOpen(false)}
              id={id}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DonationDetailsPopup;

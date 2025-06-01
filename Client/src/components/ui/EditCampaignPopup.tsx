import React, { ReactNode, useState } from "react";
import AddCampaignForm from "../forms/AddCampaignForm";
import { RxCross1 } from "react-icons/rx";
import EditCampaignForm from "../forms/EditCampaignForm";

interface IProps {
  children: ReactNode;
  id: string;
}

const EditCampaignPopup = ({ children, id }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{children}</button>
      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 w-full h-full bg-gray-900/75 flex justify-center items-center lg:p-2 z-50 "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" lg:w-1/2 w-full h-full  bg-white lg:rounded-md md:p-10 p-5 overflow-y-auto no-scrollbar relative"
          >
            <EditCampaignForm onAdd={() => setIsOpen(false)} id={id} />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-red-50 rounded-md text-2xl absolute right-2 top-2"
            >
              <RxCross1 />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditCampaignPopup;

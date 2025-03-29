import React, { ReactNode, useState } from "react";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";

interface IProps {
  onConfirm(): void | any;
  onCancel?(): void | any;
  heading: string;
  message?: string;
  children: ReactNode;
}

const ConfirmPopup = ({ onConfirm, onCancel, heading, message, children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handelCancel = () => {
    setIsOpen(false);
    onCancel && onCancel();
  };

  const handelConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };
  return (
    <>
      <div onClick={() => setIsOpen(true)} className="fit hover:cursor-pointer">
        {children}
      </div>
      {isOpen ? (
        <div
          onClick={handelCancel}
          className=" bg-gray-900/30  fixed inset-0 flex items-center justify-center w-full p-2 z-[1000]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lg:w-1/3 md:w-1/3 w-full bg-white min-h-60  rounded-md"
          >
            <div className="text-center mt-5 flex justify-center items-center ">
              <span className="text-9xl text-red-500 ">
                <TbAlertSquareRoundedFilled />
              </span>
            </div>
            <div className="mt-2 space-y-2">
              <h1 className="text-2xl font-jost text-black  text-center font-semibold">
                {heading}
              </h1>
              <p className="text-gray-500 text-center">
                {message || "After confirm it can't be undone"}
              </p>
            </div>
            <div className="mt-2 text-end">
              <button
                onClick={handelCancel}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white "
              >
                Cancel
              </button>
              <button
                onClick={handelConfirm}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white "
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConfirmPopup;

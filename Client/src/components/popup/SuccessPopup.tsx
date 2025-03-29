import React from "react";
import { RxCross1 } from "react-icons/rx";
export interface ISuccessPopupProps {
  message?: string;
  description?: string;
  status: boolean;
  setStatus: (status: boolean) => void;
}
function SuccessPopup({ message = "Success", description, status, setStatus }: ISuccessPopupProps) {
  const close = () => {
    setStatus(false);
  };

  return (
    <div
      className={`absolute inset-0 bg-primary_color bg-opacity-50 flex justify-center items-center ${status ? "visible" : "invisible"} transition-all duration-100`}
    >
      <div
        className={`w-1/3 min-h-60 p-10 bg-white relative ${status ? "translate-y-0 scale-100" : "translate-y-5 scale-0"} transition-all duration-200`}
      >
        <img
          src="https://static-00.iconduck.com/assets.00/success-icon-2048x2048-8woikx05.png"
          alt=""
          className="size-32  mx-auto rounded-full "
        />
        <div className="mt-5 space-y-2">
          <h1 className="text-2xl text-center font-jost font-semibold">{message}</h1>
          {description ? (
            <p className="text-[0.9rem] font-medium text-center w-1/2 mx-auto text-gray-600">
              {description}
            </p>
          ) : null}
        </div>
        <button onClick={close} className="text-2xl absolute top-2 right-2">
          <RxCross1 />
        </button>
      </div>
    </div>
  );
}

export default SuccessPopup;

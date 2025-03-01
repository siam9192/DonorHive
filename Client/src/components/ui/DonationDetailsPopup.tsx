import { ReactNode, useEffect, useState } from "react";
import "../../styles/Animation.style.css";
import { IoReturnUpBack, IoTrashOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";
import { BiHide } from "react-icons/bi";

interface IProps {
  children: ReactNode;
}

const DonationDetailsPopup = ({ children }: IProps) => {
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
            <h1 className="text-2xl font-medium text-gray-800">Donation Details</h1>
            <div className="mt-8">
              <div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl text-black ">
                    <LuDollarSign />
                  </span>

                  <h1 className="text-5xl font-medium text-center text-primary ">
                    120<span className="text-3xl text-gray-600">/USD</span>
                  </h1>
                </div>
                <p className="mt-3 text-gray-700">
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quis non odit
                  consequatur, minima quae unde deserunt molestiae aspernatur ullam."
                </p>
                <div className="mt-3 space-y-3 font-secondary">
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Id:</span>
                    <span className="text-primary font-semibold">34485656436545</span>
                  </p>

                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Is Asymonyes:</span>
                    <span>No</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Created At:</span>
                    <span>
                      {new Date().toDateString()}-{new Date().toLocaleTimeString()}
                    </span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Updated At:</span>
                    <span>
                      {new Date().toDateString()}-{new Date().toLocaleTimeString()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-gray-900 font-medium text-xl">Campaign Information:</h2>

                <div className="mt-3 space-y-3 font-secondary">
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Campaign Id:</span>
                    <span className="text-primary font-semibold">34485656436545</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Name:</span>
                    <span>Education For Everyone</span>
                  </p>

                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Category:</span>
                    <span>Food</span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-gray-900 font-medium text-xl">Donor Information:</h2>

                <div className="mt-3 space-y-3 font-secondary">
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">User Id:</span>
                    <span className="text-primary font-semibold">34485656436545</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Full Name:</span>
                    <span>John Doe</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Email Address:</span>
                    <span>johndoe@mail.com</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Phone Number:</span>
                    <span>+98785655</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Address:</span>
                    <span>123 Belicon,New York,Bangladesh</span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-gray-900 font-medium text-xl">Payment Information:</h2>
                <div className="mt-3 space-y-3 font-secondary">
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Transaction Id:</span>
                    <span className="text-primary font-medium">R576753F873KS</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Amount:</span>
                    <span className=" text-blue-700 font-medium">120</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Currency:</span>
                    <span className="px-2 py-1 rounded-md text-purple-600  font-medium">USD</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Method:</span>
                    <span className="px-2 py-1 rounded-md  bg-blue-100 text-blue-700 font-medium">
                      Paypal
                    </span>
                  </p>

                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Status:</span>
                    <span className="text-primary font-medium">Success</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Created At:</span>
                    <span>
                      {new Date().toDateString()}-{new Date().toLocaleTimeString()}
                    </span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Updated At:</span>
                    <span>
                      {new Date().toDateString()}-{new Date().toLocaleTimeString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end items-center gap-2">
              <button className=" bg-gray-100   flex items-center gap-1 p-2 font-medium text-black rounded-md">
                <span className="text-3xl text-red-700">
                  <BiHide />
                </span>

                <span>Hide From viewers</span>
              </button>
              <button className=" bg-gray-100   flex items-center gap-1 p-2 font-medium text-black rounded-md">
                <span className="text-3xl text-red-700">
                  <IoReturnUpBack />
                </span>

                <span>Refund</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DonationDetailsPopup;

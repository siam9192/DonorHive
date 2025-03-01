import { ReactNode, useEffect, useState } from "react";
import "../../styles/Animation.style.css";
import { IoTrashOutline } from "react-icons/io5";
import { GoBlocked } from "react-icons/go";
import { FaCheck } from "react-icons/fa";

interface IProps {
  children: ReactNode;
}

const UserDetailsPopup = ({ children }: IProps) => {
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
            className="lg:w-1/3 md:w-10/12 w-full min-h-[70vh] bg-white rounded-md md:p-10 p-5 "
          >
            <h1 className="text-2xl font-medium text-gray-800">User Details</h1>
            <div className="mt-8">
              <div>
                <img
                  src="/images/default-profile.png"
                  alt=""
                  className="size-28 rounded-full mx-auto"
                />
                <h1 className="mt-2 text-xl font-medium text-center text-gray-950">
                  John Doe <span className="text-primary">(Donor)</span>
                </h1>
              </div>

              <div className="mt-4">
                <h2 className="text-gray-900 font-medium text-xl">Personal Information:</h2>
                <div className="mt-3 space-y-3 font-secondary">
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
                <h2 className="text-gray-900 font-medium text-xl">Account Information:</h2>
                <div className="mt-3 space-y-3 font-secondary">
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Role:</span>
                    <span className="rounded-md   text-primary font-medium">Donor</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Provider:</span>
                    <span className="px-2 py-1 rounded-md  bg-blue-100 text-blue-700 font-medium">
                      Facebook
                    </span>
                  </p>

                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Status:</span>
                    <span className="text-primary font-medium">Active</span>
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
              <button className="p-2 bg-gray-100 rounded-full text-2xl text-red-700">
                <IoTrashOutline />
              </button>
              <button className="p-2 bg-gray-100 rounded-full text-2xl text-pink-700">
                <GoBlocked />
              </button>
              <button className="p-2 bg-gray-100 rounded-full text-2xl text-primary">
                <FaCheck />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserDetailsPopup;

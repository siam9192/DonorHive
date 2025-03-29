import { ReactNode, useEffect, useState } from "react";
import "../../styles/Animation.style.css";

import UserDetails from "./UserDetails";

interface IProps {
  id:string
  children: ReactNode;
}

const UserDetailsPopup = ({ children,id }: IProps) => {
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
       <UserDetails id={id} closePopup={()=>setIsOpen(false)}/>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserDetailsPopup;

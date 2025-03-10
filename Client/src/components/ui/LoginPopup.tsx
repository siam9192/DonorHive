import { ReactNode, useEffect, useState } from "react";
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";

interface IProps {
  children: ReactNode;
}

type TTab = "login" | "register";

const LoginPopup = ({ children }: IProps) => {
  const [active, setActive] = useState<TTab>("login");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const handelNavigate = (tab: TTab) => setActive(tab);

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
            className="lg:w-1/3 md:w-10/12 w-full min-h-[70vh] bg-white rounded-md md:p-10 p-5"
          >
            <div className="relative">
              <div className="grid grid-cols-2 auth-popup-button-container rounded-full border-2 border-gray-600/20">
                <button
                  onClick={() => handelNavigate("login")}
                  className={`w-full py-3    e  ${active === "login" ? "bg-primary  rounded-full" : ""}`}
                >
                  Login
                </button>
                <button
                  onClick={() => handelNavigate("register")}
                  className={`w-full py-3    rounded-full ${active === "register" ? "bg-primary border-none" : ""}`}
                >
                  Register
                </button>
              </div>
            </div>
            <div className="mt-6 min-h-[40vh]">
              {active === "login" ? (
                <LoginForm onSuccess={() => setIsOpen(false)} />
              ) : (
                <RegisterForm />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginPopup;

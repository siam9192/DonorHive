import { ButtonHTMLAttributes, cloneElement, ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";

interface IProps {
  children: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
}

type TTab = "login" | "register";

const LoginPopup = ({ children }: IProps) => {
  const [active, setActive] = useState<TTab>("login");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const trigger = cloneElement(children, {
    type: "button",
    "aria-haspopup": "dialog",
    "aria-expanded": isOpen,
    onClick: (event) => {
      children.props.onClick?.(event);
      setIsOpen(true);
    },
  });

  return (
    <>
      {trigger}
      {isOpen &&
        createPortal(
          <div
            onClick={() => setIsOpen(false)}
            className="auth-popup fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-sm sm:p-5"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="auth-popup-title"
              className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:max-h-[calc(100dvh-2.5rem)] sm:p-8"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close sign in dialog"
                className="absolute right-4 top-4 rounded-full p-2 text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <IoClose />
              </button>
              <div className="mb-6 pr-10">
                <p className="text-sm font-medium text-emerald-700">Welcome to DonorHive</p>
                <h2 id="auth-popup-title" className="mt-1 text-2xl font-semibold text-slate-900">
                  {active === "login" ? "Sign in to your account" : "Create your account"}
                </h2>
              </div>
              <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                {(["login", "register"] as const).map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setActive(tab)}
                    aria-pressed={active === tab}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold capitalize transition ${
                      active === tab
                        ? "bg-white text-emerald-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {active === "login" ? (
                <LoginForm onSuccess={() => setIsOpen(false)} />
              ) : (
                <RegisterForm onSuccess={() => setIsOpen(false)} />
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default LoginPopup;

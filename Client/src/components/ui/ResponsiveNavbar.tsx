import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Campaigns",
    href: "/campaigns",
  },
  {
    name: "About Us",
    href: "/about-us",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];

const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="rounded-xl bg-emerald-50 p-2.5 text-xl text-emerald-900 transition hover:bg-emerald-100 lg:hidden"
      >
        <AiOutlineMenu />
      </button>
      {isOpen &&
        createPortal(
          <div
            className="responsive-navbar fixed inset-0 z-[9998] h-[100dvh] w-full overflow-y-auto bg-white px-6 py-10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <Link
              to="/"
              className="mb-10 block text-2xl font-semibold tracking-tight text-slate-900"
            >
              Donor<span className="text-primary">Hive</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Close navigation menu"
              className="absolute right-5 top-6 rounded-full bg-slate-100 p-2.5 text-xl text-slate-700 transition hover:bg-slate-200"
            >
              <RxCross1 />
            </button>
            <nav className="space-y-2" aria-label="Mobile navigation">
              {navLinks.map((item) => (
                <NavLink
                  to={item.href}
                  key={item.name}
                  end={item.href === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-lg font-medium transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-800"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>,
          document.body
        )}
    </>
  );
};

export default ResponsiveNavbar;

import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Campaigns",
    href: "/",
  },
  {
    name: "News",
    href: "/",
  },
  {
    name: "About Us",
    href: "/",
  },
  {
    name: "Contact Us",
    href: "/",
  },
];

const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-2xl text-gray-950 p-2 bg-secondary   lg:hidden"
      >
        <AiOutlineMenu />
      </button>
      {isOpen && (
        <div className=" responsive-navbar fixed  inset-0  w-full h-full bg-primary z-50 px-5 py-10">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-3xl text-black"
          >
            <RxCross1 />
          </button>
          <nav className=" text-white uppercase space-y-2 ">
            {navLinks.map((item) => (
              <Link
                to={item.href}
                key={item.name}
                className="hover:text-black block text-xl p-3   "
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default ResponsiveNavbar;

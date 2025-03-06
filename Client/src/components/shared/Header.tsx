import React from "react";
import Container from "../container/Container";
import { FaDonate, FaFacebook, FaFacebookSquare, FaInstagram, FaUser } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ResponsiveNavbar from "../ui/ResponsiveNavbar";
import { CiUser } from "react-icons/ci";
import LoginPopup from "../ui/LoginPopup";
import NavShortcut from "../ui/NavShortcut";
import { useCurrentUser } from "../../provider/CurrentUserProvider";
const socialLinks = [
  {
    icon: FaFacebook,
    href: "",
  },
  {
    icon: FaX,
    href: "",
  },
  {
    icon: FaInstagram,
    href: "",
  },
];
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
    name: "News",
    href: "/",
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

const Header = () => {
  const { user, isLoading } = useCurrentUser();

  return (
    <header className="">
      <div className="bg-gray-900 py-2">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 md:text-[0.9rem] text-[0.6rem]">
              <p className="text-white">DonorHive</p>
              <p className="text-white ">+87368746</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {socialLinks.map((link, index) => (
                  <a
                    href={link.href}
                    key={index}
                    className=" md:text-xl text-[0.7rem] text-white p-2 bg-black rounded-full"
                  >
                    <link.icon />
                  </a>
                ))}
              </div>
              <Link to="/login" className="text-gray-200 md:block hidden">
                Login
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-primary md:py-6 py-4 ">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="md:text-5xl text-3xl text-white">
                <FaDonate />
              </span>
              <h1 className="md:text-2xl text-lg font-semibold text-gray-200">DonorHive</h1>
            </div>
            <nav className="lg:flex items-center gap-2 text-white uppercase lg:block hidden ">
              {navLinks.map((item) => (
                <Link to={item.href} key={item.name} className="hover:text-black ">
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button className=" md:block hidden uppercase px-6 py-3 text-gray-900 hover:bg-gray-900 hover:text-white bg-secondary  font-medium">
                Donate Now
              </button>

              {!isLoading ? (
                user ? (
                  <NavShortcut />
                ) : (
                  <LoginPopup>
                    <span className="md:text-3xl text-2xl text-white">
                      <FaUser />
                    </span>
                  </LoginPopup>
                )
              ) : null}
              <ResponsiveNavbar />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;

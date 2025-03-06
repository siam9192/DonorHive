import React from "react";
import Container from "../../container/Container";
import { FaLocationDot, FaX } from "react-icons/fa6";
import { MdPhone } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import ContactUsForm from "../../forms/ContactUsForm";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const GetInTouch = () => {
  const followUsLinks = [
    {
      icon: FaFacebook,
      href: "",
    },
    {
      icon: FaInstagram,
      href: "",
    },
    {
      icon: FaX,
      href: "",
    },
  ];
  return (
    <section className="bg-gray-100 py-10">
      <Container>
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-4">
            <h1 className="text-3xl text-black font-medium">Get In Touch</h1>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam harum reprehenderit
              molestias repellat aut deleniti velit sed doloremque odio cum?
            </p>
            <div className="space-y-2 py-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl p-2 bg-primary text-white rounded-full">
                  <FaLocationDot />
                </span>
                <div>
                  <h6 className="text-gray-900 font-medium">Address</h6>
                  <p className="text-gray-600 text-sm">233 Street,New Vilda,Bangladesh</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl p-2 bg-primary text-white rounded-full">
                  <MdPhone />
                </span>
                <div>
                  <h6 className="text-gray-900 font-medium">Phone</h6>
                  <p className="text-gray-600 text-sm">+8947846748</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl p-2 bg-primary text-white rounded-full">
                  <IoMdMail />
                </span>
                <div>
                  <h6 className="text-gray-900 font-medium">Email</h6>
                  <p className="text-gray-600 text-sm">mail56@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="pt-5 border-t-2 border-gray-700/5 flex items-center gap-2">
              {followUsLinks.map((link) => (
                <a className="">
                  <div className="text-2xl text-white bg-green-600 p-2 rounded-full w-fit">
                    <link.icon />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <ContactUsForm />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GetInTouch;

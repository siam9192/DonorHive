import { Helmet } from "react-helmet";
import ContactUsHeader from "../components/sections/Contact-Us/ContactUsHeader";
import GetInTouch from "../components/sections/Contact-Us/GetInTouch";

const ContactUs = () => {
  return (
    <>
      <Helmet title="Contact | DonorHive" />
      <ContactUsHeader />
      <GetInTouch />
    </>
  );
};

export default ContactUs;

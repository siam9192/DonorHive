import { GiPin } from "react-icons/gi";
import Container from "../../container/Container";
import Heading from "../../ui/Heading";
import { FaCreditCard } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";

const HowItWorks = () => {
  const headingProps = {
    heading: "How it Works",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi possimus perspiciatis, iste repudiandae laboriosam non quae repellat.",
  };
  const data = [
    {
      title: "Choose a Cause",
      description: "Browse through various causes and select the one you want to support.",
      icon: GiPin, // Replace with an actual icon (e.g., a FontAwesome or Material UI icon)
    },
    {
      title: "Make a Donation",
      description: "Enter your donation amount and choose between a one-time or monthly donation.",
      icon: FaCreditCard,
    },
    {
      title: "See Your Impact",
      description: "Receive updates on how your donation is making a difference in real lives.",
      icon: FaVolumeHigh,
    },
  ];

  return (
    <section className="py-10 bg-[#F1F8F6]">
      <Container>
        <Heading {...headingProps} />
        <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ">
          {data.map((item) => (
            <div key={item.title} className="p-5  rounded-md  ">
              <div className="w-fit h-fit p-3   rounded-full text-primary text-5xl mx-auto">
                <item.icon />
              </div>
              <div className="mt-4 space-y-2 text-center">
                <h2 className="text-2xl font-medium">{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;

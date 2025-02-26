import CampaignCard from "../../cards/CampaignCard";
import Container from "../../container/Container";
import Heading from "../../ui/Heading";

const RecentCauses = () => {
  const headingProps = {
    heading: "Recent Causes",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi possimus perspiciatis, iste repudiandae laboriosam non quae repellat.",
  };
  return (
    <section className="py-10">
      <Container>
        <Heading {...headingProps} />
        <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <CampaignCard key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RecentCauses;

import Container from "../../container/Container";
import Heading from "../../ui/Heading";
import ActivityCard from "../../cards/ActivityCard";

const headingProps = {
  heading: "Explore Our Activities",
  title:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi possimus perspiciatis, iste repudiandae laboriosam non quae repellat.",
};

const ExploreActivities = () => {
  const total = 4;
  return (
    <section className="py-10">
      <Container>
        <Heading {...headingProps} />

        <div className="mt-10 grid lg:grid-cols-2  grid-cols-2 lg:gap-8 gap-4 ">
          {Array.from({ length: total }).map((_, index) => (
            <ActivityCard key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExploreActivities;

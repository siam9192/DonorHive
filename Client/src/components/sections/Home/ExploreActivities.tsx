import Container from "../../container/Container";
import Heading from "../../ui/Heading";
import ActivityCard from "../../cards/ActivityCard";

const headingProps = {
  heading: "Explore Our Activities",
  title:
    "Discover engaging experiences that inspire, educate, and bring people together through creativity, collaboration, and community impact.",
};


const ExploreActivities = () => {
  const activities = [
  {
    id: "1",
    title: "Community Food Drive",
    description: "We organize monthly food drives to collect and distribute essential grocery items to families in need. Volunteers help sort, pack, and deliver food to ensure no one goes hungry.",
    coverPhotoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgXcSqko-EwL_TjPeKqvUszmM4rCMhFwk1NQ&s"
  },
  {
    id: "2",
    title: "Educational Workshop",
    description: "Our workshops provide children and adults with learning opportunities in literacy, technology, and financial literacy. These sessions aim to empower individuals and strengthen community knowledge and self-reliance.",
    coverPhotoUrl: "https://media.npr.org/assets/img/2023/02/07/02_gettyimages-1246865698_custom-e67a1dd4e86a84526fb10f33b53b5c1ba8bf4546.jpg?s=1100&c=50&f=jpeg"
  },
  {
    id: "3",
    title: "Environmental Cleanup",
    description: "Volunteers come together for park, beach, and neighborhood cleanups, collecting trash and planting trees. These activities promote environmental awareness and build pride in keeping our surroundings clean and green.",
    coverPhotoUrl: "https://img.freepik.com/free-photo/volunteer-helping-with-donation-box_23-2149230505.jpg?semt=ais_hybrid&w=740"
  },
  {
    id: "4",
    title: "Clothing Donation Drive",
    description: "We collect gently used clothing and distribute it to shelters and underserved communities. Each donated item supports someone facing hardship, helping them stay warm, comfortable, and confident.",
    coverPhotoUrl: "https://www.thebaltimorebanner.com/resizer/m916YhbtRgEJ54GcVuc5tmivM_g=/arc-photo-baltimorebanner/arc2-prod/public/LBJCYBX6QNAORP2IS4UGUF7CSM.jpg"
  }
];


  const total = 4;
  return (
    <section className="py-10">
      <Container>
        <Heading {...headingProps} />

        <div className="mt-10 grid lg:grid-cols-2  grid-cols-2 lg:gap-8 gap-4 ">
          {activities.map((_, index) => (
            <ActivityCard activity = {_} key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExploreActivities;
